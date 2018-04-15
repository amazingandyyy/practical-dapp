const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const { interfacee, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(interfacee))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
})

describe('Lottery', () => {
  it('can deploy', () => {
    assert.ok(lottery.options.address)
  })

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    })
    const players = await lottery.methods.getPlayers().call();
    
    assert.equal(accounts[1], players[0]);
    assert.equal(1, players.length);
  })

  it('allows accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    })
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    })
    await lottery.methods.enter().send({
      from: accounts[3],
      value: web3.utils.toWei('0.02', 'ether')
    })
    const players = await lottery.methods.getPlayers().call();
    
    assert.equal(accounts[1], players[0]);
    assert.equal(accounts[2], players[1]);
    assert.equal(accounts[3], players[2]);
    assert.equal(3, players.length);
  })

  it('requires a min 0.01 ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei('0.01', 'ether')
      })
      assert(false);
    } catch(err) {
      assert.ok(err);
      const players = await lottery.methods.getPlayers().call();
      assert.equal(0, players.length);
    }
  })

  it('only the manager can call pickWinner', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[1]
      })
      assert(false);
    } catch(err) {
      assert.ok(err);
    }
  })

  it('will send prize to winner and resets the player array', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('2', 'ether')
    })
    const initialBalance = await web3.eth.getBalance(accounts[1]);
    await lottery.methods.pickWinner().send({ from: accounts[0] })
    const finalBalance = await web3.eth.getBalance(accounts[1]);
    const difference =  finalBalance - initialBalance;
    assert(difference > web3.utils.toWei('1.8', 'ether'))
  })
})