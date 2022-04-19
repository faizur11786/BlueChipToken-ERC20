// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract BlueChipToken is ERC20, Ownable {

    bytes private tokenStatus = "LOCKED";

    modifier onlyUnlocked{
        require(owner() == _msgSender() ? true : keccak256(tokenStatus) == keccak256("UNLOCKED"), "LOCKED: Token Locked");
        _;
    }

    constructor(uint256 initialSupply) ERC20("BlueChipToken", "BCT") Ownable() {
        _mint(msg.sender, initialSupply);
    }

    function setTokenStatus(string memory _status) public onlyOwner returns (bool) {
        tokenStatus = bytes(_status);
        return true;
    }

    function decimals() public virtual override pure returns(uint8){
        return 8;
    }

    function transfer(
        address _to,
        uint256 _amount
    ) public onlyUnlocked virtual override returns (bool) {
        _transfer(_msgSender(), _to, _amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public onlyUnlocked virtual override returns (bool) {
        _spendAllowance(from, _msgSender(), amount);
        _transfer(from, to, amount);
        return true;
    }
}