import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User 
from .serializers import UserSerializer
from .utils import validate_eth_address, recover_to_addr, sig_to_vrs, hash_personal_message
from django.contrib.auth import login, authenticate
from web3auth.authentication import Web3Authentication
from rest_framework_simplejwt.authentication import JWTAuthentication


User = get_user_model()

class LoginOrCreateUserView(APIView):
    permission_classes = [permissions.AllowAny, ]
    authentication_classes = [JWTAuthentication, ]

    def get(self, request, address, *args, **kwargs):
        try:
            # data = request.data

            # publicAddress = data['publicAddress']
            publicAddress = address
            try:
                user = User.objects.get(publicAddress__iexact=publicAddress)
                return Response(
                    {'nonce': user.nonce},
                    status=status.HTTP_200_OK
                )
            except User.DoesNotExist:
                try:
                    user = User.objects.create_user(
                        publicAddress=publicAddress
                    )
                    user.save()
                    return Response(
                        {'nonce': user.nonce},
                        status=status.HTTP_201_CREATED
                    )
                except Exception as e:
                    print(f'{e=}')
                    return Response(
                        {'error': 'Issue creating user account'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
        except Exception as e:
            print(f'{e=}')
            return Response(
                {'error': 'Something went wrong when trying to login or create user'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class LoadUserView(APIView):
    authentication_classes = [Web3Authentication, ]
    permission_classes = [permissions.AllowAny, ]

    def perform_authentication(self, request):
        return super().perform_authentication(request)

    def get(self, request, address, nonce, signature, format=None):
        # print(f'{request.user=}')
        # print(f'{request.data=}')
        # print(f'{request.user.publicAddress=}')
        print(f'{address=}')
        print(f'{nonce=}')
        print(f'{signature=}')
        try:
            # userAddress = request.user
            # signedMessage = request.data['signedMessage']
            # nonce = request.data['nonce']

            userAddress = address
            signedMessage = signature
            nonce = nonce


            if not validate_eth_address(userAddress):
                return Response(
                    {'error': 'Invalid ethereum address'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if not userAddress == recover_to_addr(nonce, signedMessage):
                return Response(
                    {'error': 'Invalid signature'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                user = authenticate(
                    request=request, 
                    token=nonce,
                    publicAddress=userAddress,
                    signedMessage=signedMessage
                )
                if user:
                    try:
                        login(request, user, 'web3auth.backend.Web3Backend')
                        return Response(
                            {'user': user.data},
                            status=status.HTTP_200_OK
                        )
                    except Exception as e:
                        print(f'{e=}')
                        return Response(
                            {'error': 'Issue logging in user'},
                            status=status.HTTP_400_BAD_REQUEST
                        )                           
            except Exception as e:
                print(f'{e=}')
                return Response(
                    {'error': 'Issue authenticating user'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user = UserSerializer(userAddress)
            return Response(
                {'user': user.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when trying to load user'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetNonceView(APIView):
    def get(self, request):
        try:
            userid = request.data['publicAddress']
            try:
                nonce = NonceSerializer(userid)
            except User.DoesNotExist:
                try:
                    
                except:
                return Response({'error': 'address not found'}, status=status.HTTP_404_NOT_FOUND)
            return Response(
                {'nonce': nonce.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'not able to get nonce'},
                status=
            )

            