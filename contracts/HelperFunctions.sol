//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface UniswapV2Interface{
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function WETH() external pure returns (address);

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}

interface IERC20{
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


}

contract Helper{

    address UniswapV2Address=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D ;
    UniswapV2Interface UniswapContract=UniswapV2Interface(UniswapV2Address);

    function getPathForTokentoToken(address token1,address token2) internal view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = token1;
        path[1] = token2;
    
        return path;
   }

   function getPathForTokentoEth(address token) internal view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = UniswapContract.WETH();
    
        return path;
   }
    
   function getPathForEthtoToken(address token) internal view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = UniswapContract.WETH();
        path[1] = token;
    
        return path;
   }
   


    function getEstimatedETHforToken(uint Amount, address token) public view returns (uint[] memory) {       
    
        return UniswapContract.getAmountsIn(Amount, getPathForEthtoToken(token));    
    }

    function getEstimatedTokenforToken(uint Amount, address token1,address token2) public view returns (uint[] memory) {       
    
        return UniswapContract.getAmountsIn(Amount, getPathForTokentoToken(token1,token2));
    }

    function getEstimatedTokenforETH(uint Amount, address token) public view returns (uint[] memory) {       
        return UniswapContract.getAmountsIn(Amount, getPathForTokentoEth(token));

    }


}