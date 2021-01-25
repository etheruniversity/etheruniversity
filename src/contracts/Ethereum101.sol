// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Ethereum101 {
    mapping(address => uint256) balances;
    mapping(address => string) messages;

    /**
     * Step 1 of the tutorial is to deposit some ETH to the contract.
     */
    function step1_deposit() external payable {
        require(msg.value > 0);
        balances[msg.sender] += msg.value;
    }

    /**
     * Step 2 of the tutorial is to withdraw the ETH to the contract.
     */
    function step2_withdraw() external {
        require(balances[msg.sender] > 0);
        uint256 senderBalance = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(senderBalance);
    }

    /**
     * Step 3 of the tutorial is to save data to the blockchain.
     */
    function step3_saveMessage(string memory _message) external {
        messages[msg.sender] = _message;
    }

    /**
     * Checks quiz answers. Returns `true` if the answers are all correct,
     * `false` otherwise.
     */
    function submitQuizAnswers(string[2] memory _answerChoices)
        external
        pure
        returns (bool)
    {
        // Probably should hash this or something to make it less obvious
        string[2] memory correctAnswers = ["A", "B"];

        for (uint256 i = 0; i < _answerChoices.length; i++) {
            if (
                keccak256(abi.encode(_answerChoices[i])) !=
                keccak256(abi.encode(correctAnswers[i]))
            ) {
                return false;
            }
        }
        return true;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return balances[_owner];
    }

    function messageOf(address _owner) external view returns (string memory) {
        return messages[_owner];
    }
}
