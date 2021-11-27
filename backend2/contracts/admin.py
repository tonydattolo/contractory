from django.contrib import admin

from .models import SmartContract, Clause, Party
# Register your models here.

class ContractAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'description')


class ClauseAdmin(admin.ModelAdmin):
    list_display = ('id', 'contract', 'content', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'contract', 'content')

class PartyAdmin(admin.ModelAdmin):
    list_display = ('id', 'party', 'address', 'description', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'description')

admin.site.register(SmartContract, ContractAdmin)
admin.site.register(Clause, ClauseAdmin)
admin.site.register(Party, PartyAdmin)
