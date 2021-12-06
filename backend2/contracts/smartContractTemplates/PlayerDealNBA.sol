pragma solidity ^0.8.10;

contract PlayerDealNBA {

    enum DealStatus { live, completed, paused, cancelled }

    struct Team {
        address payable public teamAddress; 
        string public name;
    }

    struct Player {
        address payable public playerAddress;
        string public name;
        uint public idFromApi;
    }

    struct DealTerms {
        int weeks public contractLengthInWeeks;
        int amount;

        
    }

    // placeholder contract info
    // placeholder team info
    // placeholder player info

    

}