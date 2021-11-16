from .models import Wallet
from rest_framework import serializers

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ('__all__')