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

    # abi = models.TextField(blank=True)
    # bytecode = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    status_choices = [
        ('draft', 'draft version of smart contract'),
        ('pending', 'pending signature verifications from other parties'),
        ('live', 'live on mainnet'),
        ('complete', 'completed smart contract transactions or expiration'),
    ]
    status = models.CharField(choices=status_choices, default='draft', max_length=20)

    # list here for all authorized parties to read and/or write contracts
    # authorized_parties = models.ManyToManyField(USER, related_name='authorized_parties')
    
    
    

    # receivingParties = models.ManyToManyField('ReceivingParty', blank=True)
    # payingParties = models.ManyToManyField('PayingParty', blank=True)
    # viewingParties = models.ManyToManyField('ViewingParty', blank=True)
    # lawyers = models.ManyToManyField('Lawyer', blank=True)

    

class Party(models.Model):
    """
    This class represents the Party model.
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    party = models.ForeignKey(USER, on_delete=CASCADE)
    description = models.TextField(blank=True)
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
    
class Clause(models.Model):
    """
    This class represents the Clause model.
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    contract = models.ForeignKey(SmartContract, on_delete=CASCADE)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # amount = models.IntegerField(default=0)
    # sender = models.ForeignKey(Party, on_delete=CASCADE, related_name='sender')
    # receiver = models.ForeignKey(Party, on_delete=CASCADE, related_name='receiver')
    # trigger_choices = [
    #     ('oracle', 'oracle'),
    #     ('manual', 'manual'),
    #     ('time', 'time'),
    # ]
    # trigger = models.CharField(choices=trigger_choices, default='manual', max_length=20)
    # trigger_at = models.DateTimeField(blank=True, null=True)
    # status_choices = [
    #     ('pending', 'pending'),
    #     ('complete', 'complete'),
    # ]
    # status = models.CharField(choices=status_choices, default='pending', max_length=20)

    # payment_period_unit_choices = [
    #     ('day', 'day'),
    #     ('week', 'week'),
    #     ('month', 'month'),
    #     ('year', 'year'),
    #     ('one_time', 'one_time'),
    #     ('none', 'none'),
    # ]
    # payment_period = models.IntegerField(default=0)
    # payment_period_unit = models.CharField(max_length=20, default='days')
    # payment_amount = models.IntegerField(default=0)
    # payment_currency = models.CharField(max_length=20, default='ETH')
    # payment_address = models.CharField(max_length=42, unique=True, validators=[ethereumAddressValidator])
    # payment_status_choices = [
    #     ('pending', 'pending'),
    #     ('complete', 'complete'),
    # ]
    # payment_status = models.CharField(choices=payment_status_choices, default='pending', max_length=20)
    # payment_tx_hash = models.CharField(max_length=100, blank=True)
    # payment_tx_block_number = models.IntegerField(default=0)
    # payment_tx_block_hash = models.CharField(max_length=100, blank=True)
    # payment_tx_timestamp = models.DateTimeField(blank=True, null=True)
    # payment_tx_confirmations = models.IntegerField(default=0)
