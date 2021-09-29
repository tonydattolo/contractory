import uuid
from .utils import ensDomainValidator, validate_eth_address
from django.db import models
from django.utils import crypto, timezone

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import ugettext_lazy as _

class UserAccountManager(BaseUserManager):
    def create_user(self, publicAddress, password=None, ens=None, **extra_fields):
        if not publicAddress:
            raise ValueError('Users must have an public ethereum address')

        user = self.model(publicAddress=publicAddress, ens=ens, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, publicAddress, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        # extra_fields.setdefault('first_name','admin')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(publicAddress, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    publicAddress = models.CharField(min_length=42,max_length=42, unique=True, validators=[validate_eth_address])
    # NOTE: the nonce MUST change every time a user logs in.
    #       this is to prevent replay attacks on signed messages
    nonce = models.CharField(default=crypto.get_random_string)
    # nonce = models.UUIDField(default=uuid.uuid4().hex)
    ensDomain = models.CharField(max_length=200, unique=True, validators=[ensDomainValidator])
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserAccountManager()

    USERNAME_FIELD = 'publicAddress'
    REQUIRED_FIELDS = []

    # def get_publicAddress(self):
    #     return f"{self.publicAddress}"

    def __str__(self):
        return self.publicAddress