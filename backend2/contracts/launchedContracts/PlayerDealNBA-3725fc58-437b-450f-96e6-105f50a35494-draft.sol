pragma solidity ^0.8.10;

// chainlink price oracle
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PlayerDealNBA {
    AggregatorV3Interface internal priceFeed;
    
    constructor () {
        priceFeed = AggregatorV3Interface(0xAc559F25B1619171CbC396a50854A3240b6A4e99);
    }

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
	string public senderEmail = "icerothstein@gmail.com";
    // placeholder player info

    function getLatestPrice() public view returns (int) {
        (
            uint80 roundId,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        )  = priceFeed.latestRoundData();
        // ETH/USD price scaled by 10**8
        return price / 1e8;
    }
    
    interface AggregatorV3Interface {
        function latestRoundData() external view returns (
            uint80 roundId,
            int answer,
            uint startedAt,
            uint updatedAt,
            uint80 answeredInRound
        );
    }
}