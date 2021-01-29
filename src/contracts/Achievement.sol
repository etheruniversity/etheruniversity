// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Achievement is ERC721, AccessControl {
    string BASE_URI = "https://ether.university/a/";
    address ETHEREUM_101_CONTRACT_ADDRESS =
        0x55F7b7cEa3224b4951f95C26b375FBF54B7De571;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIds;

    // Mapping of token ID to token type (see list below)
    mapping(uint256 => uint256) tokenTypes;
    uint256 ETHEREUM_101 = 0;
    uint256 TOKENS_101 = 1;
    uint256 UNISWAP_101 = 2;
    uint256 TOKENS_102 = 3;
    uint256 COMPOUND_101 = 4;
    uint256 COMPOUND_102 = 5;
    uint256 ETHEREUM_102 = 6;
    uint256 TOKENS_103 = 7;
    uint256 UNISWAP_102 = 8;
    uint256 TOKENS_104 = 9;

    constructor() ERC721("EtherUniversityAchievement", "ETHERU") {
        _setBaseURI(BASE_URI);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, ETHEREUM_101_CONTRACT_ADDRESS);
    }

    function typeOf(uint256 _tokenId) external view returns (uint256) {
        return tokenTypes[_tokenId];
    }

    function awardAchievement(address _student, uint256 _quest)
        external
        returns (uint256)
    {
        // For now, let anyone award an achievement so we don't have to set up
        // too much admin/role/permission stuff right now.
        // require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");

        Counters.increment(_tokenIds);
        uint256 newTokenId = Counters.current(_tokenIds);
        _safeMint(_student, newTokenId);
        tokenTypes[newTokenId] = _quest;
        return newTokenId;
    }
}
