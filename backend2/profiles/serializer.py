from rest_framework import serializers
from django.db.models import fields
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('first_name', 'last_name','bio','locations','display_name')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name','bio','locations','display_name')