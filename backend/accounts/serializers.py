from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('publicAddress','nonce')

# class NonceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('publicAddress', 'nonce')
