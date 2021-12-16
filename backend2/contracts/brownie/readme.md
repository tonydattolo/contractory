

build holds low level info
  build/contracts keeps track of compiled code. note: don't add contracts manually here
  build/deployments keeps track of deployments across chains
  build/interfaces keeps track of any interfaces we're working with

contracts holds all our contracts. brownie knows to look here for them

interfaces is where we store our interfaces we want to use

reports are for reports to run

scripts is where we automate tasks. deploying, calling functions, etc. business logic

tests ...for tests

