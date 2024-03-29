from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserAccountCreationForm, UserAccountChangeForm
from .models import UserAccount
# Register your models here.

# https://testdriven.io/blog/django-custom-user-model/
class UserAccountAdmin(UserAdmin):
    add_form = UserAccountCreationForm
    form = UserAccountChangeForm
    model = UserAccount
    list_display = ['publicAddress','is_staff', 'is_active',]
    # list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        ('LoginInfo', {'fields': ('publicAddress', 'password')}),
        # ('AdditionalInfo',{'fields': ('display_name','bio','profilePic','phone_number','age','address1','address2','zip_code','city')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('publicAddress', 'password', 'is_staff', 'is_active')}
        ),
    )
    # search_fields = ('email',)
    # ordering = ('email',)
    ordering = ('id',)


admin.site.register(UserAccount, UserAccountAdmin)