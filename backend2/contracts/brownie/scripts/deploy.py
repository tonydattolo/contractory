from brownie import accounts

def deployWagers():
    partyA = accounts[0]
    partyB = accounts[1]
    arbiterOracle = accounts[2]
    print("Deploying Wagers contract...")
    print(f'{partyA=}')
    print(f'{partyB=}')
    print(f'{arbiterOracle=}')
    

def main():
    deployWagers()