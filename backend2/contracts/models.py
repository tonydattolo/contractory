from django.db import models
from uuid import uuid4
# Create your models here.
from django.contrib.auth import get_user_model
from django.db.models.deletion import CASCADE
from wallets.validators import ethereumAddressValidator

USER = get_user_model()

class SmartContract(models.Model):
    """
    This class represents the SmartContract model.
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    owner = models.ForeignKey(USER, on_delete=CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    #contract address different from eth wallet?
    address = models.CharField(max_length=100)
    # address = models.CharField(max_length=42, unique=True, validators=[ethereumAddressValidator])

    abi = models.TextField(blank=True)
    bytecode = models.TextField(blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    status_choices = [
        ('draft', 'draft version of smart contract'),
        ('pending', 'pending signature verifications from other parties'),
        ('live', 'live on mainnet'),
        ('complete', 'completed smart contract transactions or expiration'),
    ]
    status = models.CharField(choices=status_choices, default='draft', max_length=20)

    # list here for all authorized parties to read and/or write contracts
    authorized_parties = models.ManyToManyField(USER, related_name='authorized_parties')
    
    
    

    # receivingParties = models.ManyToManyField('ReceivingParty', blank=True)
    # payingParties = models.ManyToManyField('PayingParty', blank=True)
    # viewingParties = models.ManyToManyField('ViewingParty', blank=True)
    # lawyers = models.ManyToManyField('Lawyer', blank=True)

class Clause(models.Model):
    """
    This class represents the Clause model.
    """
    contract = models.ForeignKey(SmartContract, on_delete=CASCADE)
    content = models.TextField(blank=True)
    amount = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    

class Party(models.Model):
    """
    This class represents the Party model.
    """
    party = models.ForeignKey(USER, on_delete=CASCADE)
    address = models.CharField(max_length=42, unique=True, validators=[ethereumAddressValidator])
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    ROLES = [
        ('sender', 'sender'),
        ('receiver', 'receiver'),
        ('lawyer', 'lawyer'),
        ('viewer', 'viewer'),
    ]
    role = models.CharField(choices=ROLES, default='sender', max_length=12)
    
