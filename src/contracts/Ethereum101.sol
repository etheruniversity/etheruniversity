// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Ethereum101 {
    mapping(address => uint256) balance;

    /**
     * Step 1 of the tutorial is to deposit some ETH to the contract
     */
    function step1() external payable {
        require(msg.value > 0);
        balance[msg.sender] = msg.value;
    }

    function withdraw() public {
        require(balance[msg.sender] > 0);
        uint256 senderBalance = balance[msg.sender];
        balance[msg.sender] = 0;
        msg.sender.call{value: senderBalance};
    }
}
