from web3 import Web3
from solcx import compile_source, compile_standard
import json
import os
# from dotenv import load_dotenv
# load_dotenv()

GANACHE_URL = "HTTP://127.0.0.1:7545"
CHAIN_ID = 1337

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

test_address = "0xf98c6f6b64CF53f5244f3702dbC122798ECcf3B6"
test_address_private_key = "0x981a5ced5561ff1c2c8798092aa8be6b09110fa551367fcb29fda142a4d3220c"
# test_address_private_key_fromENV = os.getenv("TEST_ADDRESS_PRIVATE_KEY")

w3.eth.defaultAccount = w3.eth.accounts[0]

Greeter = w3.eth.contract(abi=abi, bytecode=bytecode)
nonce = w3.eth.getTransactionCount(w3.eth.defaultAccount)

tx = Greeter.constructor().buildTransaction({
    'chainId': CHAIN_ID,
    'from': test_address,
    'nonce': nonce,
    'gasPrice': w3.eth.gas_price,
})
signed_tx = w3.eth.account.signTransaction(tx, private_key=test_address_private_key)

tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)


# Working with a contract you need: address and abi
# Call -> simulates making the call and returning the value but no state change
# transact -> actually makes a state change

greeter = w3.eth.contract(
    address=tx_receipt.contractAddress,
    abi=abi
)
# tx_hash = Greeter.constructor().transact()
print(greeter.functions.greet().call())

tx_hash = greeter.functions.setGreeting('Ciao Bella').transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(greeter.functions.greet().call())
