// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Achievement is ERC721 {
    constructor() ERC721("EtherUniversityAchievement", "ETHERU") {}
}
