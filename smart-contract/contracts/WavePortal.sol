pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    uint256 private seed;

    mapping(address => string) favoriteAnimals;

    mapping(address => uint256) lastWavedAt;

    event NewFavoriteAnimal(
        address indexed from,
        uint256 timestamp,
        string animal
    );

    struct FavoriteAnimal {
        address sender;
        uint256 timestamp;
        string animal;
    }

    FavoriteAnimal[] favoriteAnimalSubmissions;

    constructor() payable {
        console.log("We have been constructed!");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    // TODO Change function name to set favorite animal
    function wave(string memory _animal) public {
        // Prevent user spamming
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Please wait 15 minutes before submitting your favorite animal again"
        );

        lastWavedAt[msg.sender] = block.timestamp;

        // Increment waves
        totalWaves += 1;

        // Set user's favorite animal
        favoriteAnimals[msg.sender] = _animal;

        favoriteAnimalSubmissions.push(
            FavoriteAnimal(msg.sender, block.timestamp, _animal)
        );

        // Generate random seed for ETH giveaway
        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has. "
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract. ");
        }

        // Emit event when new animal is added
        emit NewFavoriteAnimal(msg.sender, block.timestamp, _animal);

        console.log(
            msg.sender,
            " has waved! Their favorite animal is: ",
            _animal
        );
    }

    function getFavoriteAnimal() public view returns (string memory) {
        string memory favoriteAnimal = favoriteAnimals[msg.sender];

        console.log(msg.sender, "'s favorite animal is the ", favoriteAnimal);

        return favoriteAnimal;
    }

    function getAllFavoriteAnimals()
        public
        view
        returns (FavoriteAnimal[] memory)
    {
        return favoriteAnimalSubmissions;
    }

    // TODO Change the name of this function to get the total number of submissions
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves! ", totalWaves);

        return totalWaves;
    }
}
