from curses.ascii import isalnum
import sha3
import ethereum
from django import forms
from django.utils.translation import ugettext_lazy as _
from ethereum.utils import ecrecover_to_pub


def sig_to_vrs(sig):
    #    sig_bytes = bytes.fromhex(sig[2:])
    r = int(sig[2:66], 16)
    s = int(sig[66:130], 16)
    v = int(sig[130:], 16)
    return v, r, s


def hash_personal_message(msg):
    padded = "\x19Ethereum Signed Message:\n" + str(len(msg)) + msg
    return sha3.keccak_256(bytes(padded, 'utf8')).digest()


def recover_to_addr(msg, sig):
    msghash = hash_personal_message(msg)
    vrs = sig_to_vrs(sig)
    return '0x' + sha3.keccak_256(ecrecover_to_pub(msghash, *vrs)).hexdigest()[24:]


def validate_eth_address(value):
    if not isEthereumHexAddress(value):
        raise forms.ValidationError(
            _('%(value)s is not a valid Ethereum address'),
            params={'value': value},
        )

def ensDomainValidator(domain):
    if domain[-4:] != '.eth':
        raise forms.ValidationError('invald ENS domain address')

def isEthereumHexAddress(value):
    '''
    Checks if a string is a valid Ethereum address using regex
    '''
    # print(f'{value=}')
    # print(f'{value[:2]=}')
    # print(f'{value[2:]=}')
    # print(f'{len(value[2:])==40=}')
    # print(f'{isalnum(value[2:])=}')
    
    # cut off 0x prefix
    # if value[:2] == '0x':
    #     no0x = value[2:]
    # else:
    #     return False
    # check length and is alphanumeric characters only 
    # if not no0x.isalnum():
    #     return False

    if len(value[2:]) != 40:
        return False
    return True
    
