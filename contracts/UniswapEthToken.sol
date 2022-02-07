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
            
            UniswapContract.swapETHForExactTokens{ value: msg.value }(
                Amount, 
                getPathForEthtoToken(token), 
                msg.sender, 
                deadline
                );

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

    function convertTokensToEth(
        address token,
        uint amountIn,
        uint amountOutMin,
        uint deadline
    ) external
    {
        IERC20(token).transferFrom(msg.sender,address(this),amountIn);
        IERC20(token).approve(address(UniswapContract),amountIn);
        UniswapContract.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            getPathForTokentoEth(token),
            msg.sender,
            deadline
        );
        
    }

    function addMoneyToContract() public payable {
        totalContractBalance += msg.value;
    }

    receive() external payable{}

}
