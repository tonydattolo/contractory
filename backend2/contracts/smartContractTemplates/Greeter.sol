pragma solidity ^0.8.10;

contract Greeter {
    string public greeting;

    constructor() public {
        greeting = "Hello World";
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }
}