from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers

from .models import SmartContract, Clause, Party

class SmartContractSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    class Meta:
        model = SmartContract
        fields = '__all__'
        
        
class ClauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clause
        fields = '__all__'

class PartySerializer(serializers.ModelSerializer):
    partyEmail = serializers.ReadOnlyField(source='party.email')
    class Meta:
        model = Party
        fields = ('id', 'partyEmail', 'description', 'role',)
        # fields = '__all__'