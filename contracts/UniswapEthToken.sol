//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./HelperFunctions.sol";

contract UniswapEthToken is Helper{
    
    uint totalContractBalance = 0;

    function getContractBalance() public view returns(uint){
        return totalContractBalance;
    }
    
    function convertEthToToken(
        uint Amount, 
        address token,
        uint deadline
        ) public payable 
        {
            //console.log(address(this).balance);
            UniswapContract.swapETHForExactTokens{ value: msg.value }(
                Amount, 
                getPathForEthtoToken(token), 
                msg.sender, 
                deadline
                );
        //console.log(address(this).balance);
            // refund leftover ETH to the user
            (bool success,) = msg.sender.call{ value: address(this).balance }("");
            require(success, "refund failed");
        }
  
    function convertTokensToToken(
        address token1,
        address token2,
        uint amountIn,
        uint amountOutMin,
        uint deadline
    ) external
    {
        IERC20(token1).transferFrom(msg.sender,address(this),amountIn);
        IERC20(token1).approve(address(UniswapContract),amountIn);

        UniswapContract.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            getPathForTokentoToken(token1,token2),
            msg.sender,
            deadline
        );

       
        
    }

    function returnTokenBalance(address token, address account) public view returns (uint256){
        return IERC20(token).balanceOf(account);
    }


    function convertTokensToEth(
        address token,
        uint amountIn,
        uint amountOutMin,
        uint deadline
    ) external
    {
        IERC20(token).transferFrom(msg.sender,address(this),amountIn);
        IERC20(token).approve(address(UniswapContract),amountIn);
        //console.log(msg.sender.balance);
        UniswapContract.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            getPathForTokentoEth(token),
            msg.sender,
            deadline
        );
        
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function addMoneyToContract() public payable {
        totalContractBalance += msg.value;
    }

    receive() external payable{}

}
