pragma solidity 0.8.10;

contract Test {
    function test() public returns (uint) {
        return 1;
    }

    // global variables
    msg.sender; // address of sender
    msg.value; // value sent with the transaction
    msg.data; // data sent with the transaction
    msg.gas; // gas sent with the transaction
    msg.gasPrice; // gas price sent with the transaction
    msg.origin; // address where the transaction was deployed
    msg.blockHash; // hash of the block where this transaction was in
    msg.blockNumber; // number of the block where this transaction was in
    msg.transactionIndex; // index of this transaction in the block
    msg.logs; // list of log entries emitted during the transaction
    msg.returnData; // data returned by the contract
    msg.codeDeposit; // code deposit amount
    msg.gasRefund; // gas refund amount
    msg.cumulativeGasUsed; // total gas used so far by this transaction
    msg.gasUsed; // gas used by this individual transaction
    msg.confirmations; // number of confirmations for the transaction
    msg.isError; // whether there was an error or not
    msg.tx; // transaction object

    tx; // transaction object
    tx.origin; // address of sender of tx
    tx.gasPrice; // gas price of tx

    // msg.sender vs tx.origin; // true if the sender of msg is the same as the origin of tx


    // contract variables
    this; // contract address
    this.balance; // contract balance
    this.call(0x1234567890123456789012345678901234567890, 0x1234567890123456789012345678901234567890); // call a function of the contract
    this.send(0x1234567890123456789012345678901234567890, 0x1234567890123456789012345678901234567890); // send ether to the contract
    this.transfer(0x1234567890123456789012345678901234567890, 0x1234567890123456789012345678901234567890); // transfer ether to the contract
    this.transferFrom(0x1234567890123456789012345678901234567890, 0x1234567890123456789012345678901234567890, 0x1234567890123456789012345678901234567890); // transfer ether from the contract
    this.address; // contract address
    this.transact(0x1234567890123456789012345678901234567890, 0x1234567890123456789012345678901234567890); // send ether to the contract
    this.sendTransaction(0x1234567890123456789012345678901234567890, 0x1234567890123456789012345678901234567890); // send ether to the contract
}