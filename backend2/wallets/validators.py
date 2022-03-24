from django.core.exceptions import ValidationError
# from eth_utils import is_hex_address
# from ethereum.utils import 
import sha3
from ethereum.utils import ecrecover_to_pub

from wallets.utils import isEthereumHexAddress

def ethereumAddressValidator(address):
    if not isEthereumHexAddress(address):
        raise ValidationError("Invalid Ethereum address")
    return True

def ensDomainValidator(domain):
    if domain[-4:] != ".eth":
        raise ValidationError("Invalid ENS domain")
    if len(domain) > 63:
        raise ValidationError("ENS domain too long")
    return True

# https://medium.com/@angellopozo/ethereum-signing-and-validating-13a2d7cb0ee3

def signatureToVRS(signature):
    r = int(signature[2:66], 16)
    s = int(signature[66:130], 16)
    v = int(signature[130:], 16)
    # v = int(signature[-1:])
    return v, r, s

def hashMessage(message):
    padded = "\x19Ethereum Signed Message:\n" + str(len(message)) + message
    return sha3.keccak_256(bytes(padded, 'utf8')).digest()

def recoverAddress(message, signature):
    messageHash = hashMessage(message)
    vrs = signatureToVRS(signature)
    return '0x' + sha3.keccak_256(ecrecover_to_pub(messageHash, *vrs)).hexdigest()[24:]
