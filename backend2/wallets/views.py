from django.db.models.fields import DateTimeField
from django.utils import crypto, timezone
from eth_utils import address
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Wallet
from .serializers import WalletSerializer
from .permissions import IsOwnerOrReadOnly
from .validators import ethereumAddressValidator, recoverAddress


class AddWalletView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [JWTAuthentication, ]

    def post(self, request, address):
        print(f'{request.user=}')
        print(f'{address=}')
        try:
            if not address:
                return Response(
                    {'message': 'Address is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if not ethereumAddressValidator(address):
                return Response(
                    {'message': 'Address is invalid'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if Wallet.objects.filter(address=address).exists():
                return Response(
                    {'message': 'Wallet is already connected to an account'},
                    status=status.HTTP_409_CONFLICT
                )
            if Wallet.objects.filter(owner=request.user, address=address).exists():
                return Response(
                    {'message': 'Wallet is already connected to your account'},
                    status=status.HTTP_409_CONFLICT
                )
            try:
                wallet = Wallet.objects.create(
                    owner=request.user,
                    address=address
                )
                wallet.save()
                return Response(
                    {'message': 'Wallet was added successfully'},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                print(f'{e=}')
                return Response(
                    {'error': 'Problem adding wallet to account'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            print(f'{e=}')
            return Response(
                {'error': 'Problem adding wallet to account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetNonceView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [JWTAuthentication, ]

    def get(self, request, address):
        try:
            if not address:
                return Response(
                    {'error': 'Address is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if not ethereumAddressValidator(address):
                return Response(
                    {'error': 'Address is invalid'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            try:
                wallet = Wallet.objects.get(
                    owner=request.user,
                    address=address,
                )
                serializer = WalletSerializer(wallet)
                return Response(
                    {'nonce': serializer.data},
                    status=status.HTTP_200_OK
                )
            except Exception as e:
                return Response(
                    {'error': f'Problem getting nonce: {e=}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            # print(f'{e=}')
            return Response(
                {'error': 'catchall error for get nonce view'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ConfirmSignatureView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [JWTAuthentication, ]

    def post(self, request, address, nonce, signature):
        try:
            if not address:
                return Response(
                    {'error': 'Address is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if not nonce:
                return Response(
                    {'error': 'Nonce is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if not signature:
                return Response(
                    {'error': 'Signature is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if not ethereumAddressValidator(address):
                return Response(
                    {'error': 'Address is invalid'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if not recoverAddress(nonce, signature):
                return Response(
                    {'error': 'Signature is invalid'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                wallet = Wallet.objects.get(
                    owner=request.user,
                    address=address,
                )

                if wallet.nonce == nonce:
                    print(f'{recoverAddress(nonce, signature)=}')
                    print(f'{address=}')
                    print(f'{wallet.address=}')
                    print(f'{wallet.address.lower()=}')
                    if not recoverAddress(nonce, signature) == wallet.address.lower():
                        return Response(
                            {'error': 'Signature is invalid'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    # wallet.nonce = int(nonce) + 1
                    wallet.verified = True
                    wallet.verified_at = timezone.now()
                    wallet.nonce = crypto.get_random_string(length=50)
                    
                    wallet.save()
                    return Response(
                        {'message': 'Signature confirmed'},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {'error': 'Nonce is invalid'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except Exception as e:
                return Response(
                    {'error': f'Problem confirming signature: {e=}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            # print(f'{e=}')
            return Response(
                {'error': 'catchall error for confirm signature view'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetWalletsByUserView(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    authentication_classes = [JWTAuthentication, ]

    def get(self, request, email):
        try:
            wallets = Wallet.objects.filter(owner=request.user)
            serializer = WalletSerializer(wallets, many=True)
            return Response(
                {'wallets': serializer.data},
                status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': 'Problem getting wallets by user'},
                status=status.HTTP_400_BAD_REQUEST
            )
