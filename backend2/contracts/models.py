from django.db import models
from uuid import uuid4
# Create your models here.
from django.contrib.auth import get_user_model
from django.db.models.deletion import CASCADE

USER = get_user_model()

class SmartContract(models.Model):
    """
    This class represents the SmartContract model.
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    created_by = models.ForeignKey(USER, on_delete=CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    address = models.CharField(max_length=100)
    abi = models.TextField(blank=True)
    bytecode = models.TextField(blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    status_choices = [
        ('draft', 'draft'),
        ('pending', 'pending'),
        ('live', 'live'),
        ('complete', 'complete'),
    ]
    status = models.CharField(choices=status_choices, default='draft')

    clauses = models.ManyToManyField('Clause', blank=True)
    receivingParties = models.ManyToManyField('ReceivingParty', blank=True)
    payingParties = models.ManyToManyField('PayingParty', blank=True)
    viewingParties = models.ManyToManyField('ViewingParty', blank=True)
    lawyers = models.ManyToManyField('Lawyer', blank=True)

class Clause(models.Model):
    """
    This class represents the Clause model.
    """

    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Party(models.Model):
    """
    This class represents the Party model.
    """
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class PayingParty(models.Model):
    """
    This class represents the PayingParty model.
    """
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    publicAddress = models.CharField(max_length=100)

class ReceivingParty(models.Model):
    """
    This class represents the ReceivingParty model.
    """
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ViewingParty(models.Model):
    """
    This class represents the ViewingParty model.
    """
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

