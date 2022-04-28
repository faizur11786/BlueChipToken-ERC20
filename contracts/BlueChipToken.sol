// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract BlueChipCoin is ERC20, Ownable {

    /**
    * @dev Implementation of the {IERC20} interface.
    *
    * TIP: For a detailed writeup see our guide
    * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
    * to implement supply mechanisms].
    *
    * We have followed general OpenZeppelin Contracts guidelines: functions revert
    * instead returning `false` on failure. This behavior is nonetheless
    * conventional and does not conflict with the expectations of ERC20
    * applications.
    *
    * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
    * This allows applications to reconstruct the allowance for all accounts just
    * by listening to said events. Other implementations of the EIP may not emit
    * these events, as it isn't required by the specification.
    *
    * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
    * functions have been added to mitigate the well-known issues around setting
    * allowances. See {IERC20-approve}.
    */

    constructor(uint256 initialSupply) ERC20("BlueChip Coin", "BCC") Ownable() {
        _mint(_msgSender(), initialSupply);
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public virtual override pure returns(uint8){
        return 8;
    }

    /**
     * @dev Destroys `amount` tokens from `_msgSender()`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `_msgSender()` must have at least `amount` tokens.
     */
    function burn(uint256 _amount) public virtual returns (bool) {
        _burn(_msgSender(), _amount);
        return true;
    }

}