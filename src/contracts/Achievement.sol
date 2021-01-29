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

    enum Quest {
        ETHEREUM_101,
        TOKENS_101,
        UNISWAP_101,
        TOKENS_102,
        COMPOUND_101,
        COMPOUND_102,
        ETHEREUM_102,
        TOKENS_103,
        UNISWAP_102,
        TOKENS_104
    }

    constructor() ERC721("EtherUniversityAchievement", "ETHERU") {
        _setBaseURI(BASE_URI);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, ETHEREUM_101_CONTRACT_ADDRESS);
    }

    function awardAchievement(address _student, Quest _quest)
        external
        returns (uint256)
    {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");

        Counters.increment(_tokenIds);

        uint256 newTokenId = Counters.current(_tokenIds);
        _mint(_student, newTokenId);
        _setTokenURI(newTokenId, uint2str(newTokenId));

        return newTokenId;
    }

    // From https://github.com/provable-things/ethereum-api/blob/master/oraclizeAPI_0.5.sol#L1045
    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + (_i % 10)));
            _i /= 10;
        }
        return string(bstr);
    }
}
