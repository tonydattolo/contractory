pragma solidity ^0.8.10;

// chainlink price oracle
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PlayerDealNBA {
    AggregatorV3Interface internal priceFeed;

    Team public team;
    Player public player;
    DealTerms public terms;
    PerformanceBonus[] public bonuses;
    
    function PlayerDealNBA(AggregatorV3Interface _priceFeed) public {
        priceFeed = _priceFeed;
    }

    // constructor only called when contract is created
    constructor () {
        // set the price feed for ethereum. maybe coinbase has a free one?
        priceFeed = AggregatorV3Interface(0xAc559F25B1619171CbC396a50854A3240b6A4e99);
        team = new Team();
        player = new Player();
        terms = new DealTerms();
        bonuses = new PerformanceBonus[];
    }

    // function getPrice(string memory _playerName) public view returns (uint) {
    //     return priceFeed.getAggregatedValue(_playerName);
    // }

    mapping (bool => uint) performanceBonus;
    event WeeklySalaryPaid(address indexed player, uint256 salary);
	string public senderEmail = "user123@gmail.com";

    enum DealStatus { live, completed, paused, cancelled }

    // event allows you to publicize something to users outside the contract

    error InsufficientFunds(uint requested, uint available);

    address oracle = "";

    modifier onlyOracle {
        require(msg.sender == oracle);
        _; // means rest of the code comes after the modifier
    }

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

    struct PerformanceBonus {
        string public description;
        bool public isTriggered;
        uint256 public bonusAmount;
    }
    // grab performance bonus clauses from backend, and map to PerformanceBonus Objects
    // then tie to the player

    function getPerformanceBonus(uint256 _playerId) public view returns (uint256) {
        return bonuses[_playerId].bonusAmount;
    }

    function sendPerformanceBonus(uint256 _playerId) external onlyOracle {
        // send ether to player address
        require(msg.sender == oracle, "Only oracle can send performance bonuses");
        if (bonuses[_playerId].bonusAmount > balanceOf(team.teamAddress)) {
            throw InsufficientFunds(bonuses[_playerId].bonusAmount, balanceOf(team.teamAddress));
        }
        emit PerformanceBonusPaid(player.playerAddress, bonuses[_playerId].bonusAmount);
    }

    // placeholder contract info
    // placeholder team info
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