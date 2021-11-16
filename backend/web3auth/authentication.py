from django.contrib.auth import get_user_model
from web3auth.settings import app_settings
from web3auth.utils import recover_to_addr

# Creating custom authentication in DRF:
# https://www.django-rest-framework.org/api-guide/authentication/#custom-authentication
from rest_framework import authentication
from rest_framework import exceptions


class Web3Authentication(authentication.BaseAuthentication):
    def authenticate(self, request, address, nonce, signature):
        # get custom user model
        User = get_user_model()
        # check if the address the user has provided matches the signature
        if not address == recover_to_addr(nonce, signature):
            return None
        else:
            try:
                user = User.objects.get(publicAddress__exact=address)
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed('no such user')
            
        return (user, None)
        # return user