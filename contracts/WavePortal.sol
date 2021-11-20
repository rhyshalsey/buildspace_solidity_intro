pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("Ayyyyy LMAO! ");
    }

    mapping(address => string) favoriteAnimals;

    function wave(string memory _animal) public {
        totalWaves += 1;

        favoriteAnimals[msg.sender] = _animal;

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

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves! ", totalWaves);

        return totalWaves;
    }
}
