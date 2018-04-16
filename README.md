# Ether Development


## Notes

### Data type

- string
- bool
- int, int8, int16, int32, int256
- uint
- fixed/ufixed
- address
- fixed array, int[3]
  - use function to return a whole array
- dynamic array, int[]
- mapping, mapping(address => string)
- struct
```javascript
struct Kitty {
  address owner;
  int: price;
}
```

## Function Types

- public
- private, tell developer that only the contract can call the funtion, but not for security purpose
- view/constant
- pure
- payable

## web3 interface
```javascript
const web3 = new Web3(provider);
web3.utils.toWei('0.01', 'ether');
let someoneBalance = await web3.eth.getBalance(accounts[0]);
```

### Global Variables

- mgs.data
- msg.gas
- msg.sender
- msg.value, in wei

- ether
- block.defficulty
- now (time)
- this.balance

## Global Functions

- require
- sha3, keccak256
- address.transfer()

## Default value

- string to ""(empty string)
- bool to false
- uint to 0
- msg.value are in wei

## Resource

[Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/)
