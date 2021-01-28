// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface CToken {
    function supplyRatePerBlock() external view returns (uint);
    function exchangeRateStored() external view returns (uint);
}

interface ERC20Token {
  function balanceOf(address owner) external view returns (uint);
  function allowance(address owner, address spender) external view returns (uint);
}

contract Compound101 {
    //mapping(address => uint8) progress;
    address cToken;
    address token;

    constructor(address _cToken, address _token) {
        cToken = _cToken;
        token = _token;
    }

    function getViewModel() external view returns (uint ethBalance, uint supplyRatePerBlock, uint tokenPerCtokenRate, uint cTokenBalance, uint tokenBalance, uint currentAllowance) {
        ethBalance = msg.sender.balance;
        supplyRatePerBlock = CToken(cToken).supplyRatePerBlock();
        tokenPerCtokenRate = CToken(cToken).exchangeRateStored();
        cTokenBalance = ERC20Token(cToken).balanceOf(msg.sender);
        tokenBalance = ERC20Token(token).balanceOf(msg.sender);
        currentAllowance = ERC20Token(token).allowance(msg.sender, cToken);
    }

    /**
     * Step 1 of the tutorial is to deposit some ETH to the contract.
     */
    /*function step1_approve() external {
        require(msg.value > 0);
        if (progress[msg.sender] == 0) {
            progress[msg.sender] = 1;
        }
        // approve for sending
    }*/

    /**
     * Step 2 of the tutorial is to withdraw the ETH to the contract.
     */
    /*function step2_deposit() external {
        if (progress[msg.sender] == 1) {
            progress[msg.sender] = 2;
        }
        // deposit to compound
    }*/

    /**
     * Step 3 of the tutorial is to save data to the blockchain.
     */
    /*function step3_withdrwa(string memory _message) external {
        if (progress[msg.sender] == 2) {
            progress[msg.sender] = 3;
        }
        // withdraw from compound
    }*/

}
