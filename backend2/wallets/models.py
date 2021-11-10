from django.db import models
import uuid
from django.utils import crypto, timezone
from .validators import ethereumAddressValidator, ensDomainValidator
from django.contrib.auth import get_user_model

USER = get_user_model()

# Create your models here.
class Wallet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(USER, on_delete=models.CASCADE)
    address = models.CharField(max_length=42, unique=True, validators=[ethereumAddressValidator])
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # NOTE: the nonce MUST change every time a user logs in.
    #       this is to prevent replay attacks on signed messages
    nonce = models.CharField(max_length=50, default=crypto.get_random_string(length=50))
    # nonce = models.UUIDField(default=uuid.uuid4().hex)
    ens = models.CharField(max_length=200, unique=True, validators=[ensDomainValidator], blank=True, null=True)
    verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(blank=True, null=True)
    
    def save(self, *args, **kwargs):
        # self.address = self.address.lower()
        super(Wallet, self).save(*args, **kwargs)