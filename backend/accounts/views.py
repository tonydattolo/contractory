import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User 
from .serializers import UserSerializer
from .utils import validate_eth_address

User = get_user_model()

class RegisterView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            data = request.data

            publicAddress = data['username']
            # password = data['password']
            # re_password = data['re_password']

            # check if given address is a valid ethereum address
            if not (validate_eth_address(publicAddress)):
                return Response(
                    {'error': 'Invalid ethereum address'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # check if an account has already been created with that address 
            if User.obects.filter(publicAddress__iexact=publicAddress).exists():
                return Response(
                    {'error': 'Account already exists with that address'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                user = User.objects.create_user(
                    publicAddress=publicAddress,
                    password=User.set_unusable_password()
                )
                user.save()
                return Response(
                    {'success': f'account for {publicAddress} created'},
                    status=status.HTTP_201_CREATED
                )
            except:
                return Response(
                    {'error': 'Issue creating user account'},
                    status=status.HTTP_400_BAD_REQUEST
                )    

        except:
            return Response(
                {'error': 'Something went wrong when trying to register account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class LoadUserView(APIView):
    def get(self, request, format=None):
        try:
            user = request.user
            user = UserSerializer(user)

            return Response(
                {'user': user.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when trying to load user'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# class LoadNonce(APIView):
#     def get(self, request):
#         try:
            