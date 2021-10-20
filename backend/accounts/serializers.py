from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
USER = get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ('publicAddress','nonce')

class NonceSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ('nonce')
