from web3 import Web3
from solcx import compile_source, compile_standard
import json
import os
from dotenv import load_dotenv
load_dotenv()

GANACHE_URL = "HTTP://127.0.0.1:7545"
CHAIN_ID = 5777

# timestamp tutorial for using solc https://www.youtube.com/watch?v=M576WGiDBdQ&t=10867s
# compiled_sol = compile_source(
#     open('../smartContractTemplates/Greeter.sol').read()
#     )

with open('../smartContractTemplates/Greeter.sol') as f:
    # compiled_sol = compile_source(f.read())
    greeter_file = f.read()

compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {
            "Greeter.sol": {
                # "content": open('../smartContractTemplates/Greeter.sol').read()
                "content": greeter_file
            }
        },
        "settings": {
            "outputSelection": {
                "*": {
                    "*": [
                        "abi",
                        "metadata",
                        "evm.bytecode",
                        "evm.sourceMap",
                    ]
                }
            }
        },
    },
    solc_version="0.8.10"
)

# print(f'{compiled_sol=}')

with open("compiled_code.json", "w") as f:
    json.dump(compiled_sol, f)

bytecode = compiled_sol["contracts"]["Greeter.sol"]["Greeter"]["evm"]["bytecode"]["object"]
abi = compiled_sol["contracts"]["Greeter.sol"]["Greeter"]["abi"]
# shortcut?
# contract_id, contract_interface = compiled_sol.popitem()
# bytecode = contract_interface['bin']
# abi = contract_interface['abi']

w3 = Web3(Web3.HTTPProvider(GANACHE_URL))

test_address = "0xC805A751470F4E5684048ea53008654b89Cc505B"
test_address_private_key = "0x041e223752afea77f424cd8921d8ce7040d8fc2a8df6489835afe98dbadc3e16"
# test_address_private_key_fromENV = os.getenv("TEST_ADDRESS_PRIVATE_KEY")

w3.eth.defaultAccount = w3.eth.accounts[0]

Greeter = w3.eth.contract(abi=abi, bytecode=bytecode)
nonce = w3.eth.getTransactionCount(w3.eth.defaultAccount)

tx = Greeter.constructor().buildTransaction({
    'chainId': CHAIN_ID,
    'from': w3.eth.defaultAccount,
    'nonce': nonce,
    # 'gas': 1000000,
    # 'gasPrice': w3.toWei('50', 'gwei'),
})
signed_tx = w3.eth.account.signTransaction(tx, private_key=test_address_private_key)



# tx_hash = Greeter.constructor().transact()
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# greeter = w3.eth.contract(
#     address=tx_receipt.contractAddress,
#     abi=abi
#     )

# greeter.functions.greet().call()

# tx_hash = greeter.functions.setGreeting('Ciao Bella').transact()
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
# greeter.functions.greet().call()
