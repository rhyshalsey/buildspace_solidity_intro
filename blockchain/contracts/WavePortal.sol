pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() payable {
        console.log("We have been constructed!");
    }

    mapping(address => string) favoriteAnimals;

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

    // TODO Change function name to set favorite animal
    function wave(string memory _animal) public {
        totalWaves += 1;

        favoriteAnimals[msg.sender] = _animal;

        favoriteAnimalSubmissions.push(
            FavoriteAnimal(msg.sender, block.timestamp, _animal)
        );

        emit NewFavoriteAnimal(msg.sender, block.timestamp, _animal);

        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has. "
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract. ");

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
