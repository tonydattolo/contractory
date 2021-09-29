from django.contrib.auth import get_user_model
from web3auth.settings import app_settings
from web3auth.utils import recover_to_addr

# Creating custom authentication in DRF:
# https://www.django-rest-framework.org/api-guide/authentication/#custom-authentication
from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions


class Web3Authentication(authentication.BaseAuthentication):
    def authenticate(self, request, address=None, token=None, signature=None):
        # get user model
        user = get_user_model()

        # check if request contains an address
        address = request.GET.get("address")
        if not address: # no address given in request headers
            return None

        # check if the address the user has provided matches the signature
        if not address == recover_to_addr(token, signature):
            # return None
            # return ValidationError('address and signature did not match on backend')
            raise exceptions.ValidationError("signature doesn't match address on backend")
        else:
            try:
                # get address field for the user model
                # address_field = app_settings.WEB3AUTH_USER_ADDRESS_FIELD
                address_field = 'publicAddress'
                kwargs = {
                    f"{address_field}__iexact": address
                } # NOTE: check the names of these

                # try to get user with provided data
                user = User.objects.filter(**kwargs).first()
                # return user
            except User.DoesNotExist:
                try: 
                    user = User(publicAddress=address, **kwargs)
                    user.set_unusable_password()
                    user.is_staff = False
                    user.is_superuser = False
                    user.is_active = True
                    user.save()
                    # return user
                except:
                    raise exceptions.AuthenticationFailed('error creating new user on backend')
        return (user, None)
