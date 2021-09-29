from rest_framework import serializers
from django.contrib.auth import get_user_model
from backend.accounts.utils import validate_eth_address
import string
# not sure which is better to use tbh
from eth_utils import is_hex_address
from ethereum.utils import check_checksum


class LoginSerializer(serializers.BaseSerializer):
    signature = serializers.HiddenField(max_length=132, min_length=132)
    address = serializers.HiddenField(max_length=42, min_length=42)

    def validate_signature(self):
        sig = self.validated_data['signature']
        if any([
            len(sig) != 132,
            sig[130:] != '1b' and sig[130:] != '1c',
            not all(c in string.hexdigits for c in sig[2:])
        ]):
            raise serializers.ValidationError('Invalid signature')
        return sig

    def validate_address(self):
        addr = self.validated_data['address']
        # if not is_hex_address(addr):
        if not check_checksum(addr):
            raise serializers.ValidationError(f'{addr} is not valid eth address')
        return addr
