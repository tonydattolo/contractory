# custom user creation form
from django.utils.translation import ugettext_lazy as _
import string
from backend.accounts.utils import validate_eth_address
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import UserAccount

class UserAccountCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = UserAccount
        # fields = UserCreationForm.Meta.fields + ('age',) #overides default by adding age
        fields = ('publicAddress',)

class UserAccountChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = UserAccount
        fields = UserChangeForm.Meta.fields
        
        # fields = UserChangeForm.Meta.fields + ('display_name','bio','profilePic','phone_number','age','address1','address2','zip_code','city',)
        # fields = ('email','display_name','bio','profilePic','phone_number','age','address1','address2','zip_code','city',)
        # fields = UserChangeForm.Meta.fields += ['bio',]
        # fields = ('email','display_name',)
        # fields = '__all__'

class LoginForm(forms.Form):
    signature = forms.CharField(widget=forms.HiddenInput, max_length=132)
    address = forms.CharField(widget=forms.HiddenInput, max_length=42, validators=[validate_eth_address])

    def __init__(self, token, *args, **kwargs):
        self.token = token
        super(LoginForm, self).__init__(*args, **kwargs)

    def clean_signature(self):
        sig = self.cleaned_data['signature']
        if any([
            len(sig) != 132,
            sig[130:] != '1b' and sig[130:] != '1c',
            not all(c in string.hexdigits for c in sig[2:])
        ]):
            raise forms.ValidationError(_('Invalid signature'))
        return sig