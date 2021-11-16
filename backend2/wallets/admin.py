from django.contrib import admin
from .models import Wallet

# Register your models here.
class WalletAdmin(admin.ModelAdmin):
    list_display = ('owner', 'address', 'id', 'nonce', 'verified', 'created_at',)

admin.site.register(Wallet, WalletAdmin)