from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers

from .models import SmartContract
from .models import Clause

class SmartContractSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    class Meta:
        model = SmartContract
        fields = '__all__'
        
        
class ClauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clause
        fields = '__all__'
        