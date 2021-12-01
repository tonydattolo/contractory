from django.db.models import fields
from .models import Wallet
from rest_framework import serializers

class WalletSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email')
    # nonce = serializers.HiddenField(source='nonce', allow_null=True, read_only=True, default="")
    class Meta:
        model = Wallet
        # fields = ('__all__')
        fields = ['id','address','owner','nonce','name','description',
                  'created_at','updated_at','verified','verified_at',
                  ]