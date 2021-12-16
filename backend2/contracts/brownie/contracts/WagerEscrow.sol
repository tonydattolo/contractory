pragma solidity ^0.8.10 <0.9.0;


contract WagerEscrow {

    address public partyA;
    address public partyB;
    address public arbiterOracle;
    bool public WINNER_A = false;
    bool public WINNER_B = false;
    bool public TIE = false;
    bool public CANCELLED = false;

    uint public wagerAmount;


    // function to have msg.sender set the partyA
    function setPartyA(address _partyA) public {
        partyA = _partyA;
    }
    // function to have msg.sender set the partyB
    function setPartyB(address _partyB) public {
        partyB = _partyB;
    }

    // function to have msg.sender set the arbiterOracle
    function setArbiterOracle(address _arbiterOracle) public {
        arbiterOracle = _arbiterOracle;
    }

    // function to have msg.sender set the wagerAmount
    function setWagerAmount(uint _wagerAmount) public {
        wagerAmount = _wagerAmount;
    }

    // function to have arbiterOracle set the winner
    function setWinner(bool _winner) public {
        if (arbiterOracle == msg.sender) {
            if (_winner) {
                WINNER_A = true;
            } else {
                WINNER_B = true;
            }
        }
    }


}

