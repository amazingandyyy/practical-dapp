const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const { interfacee, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const initialMessage = 'Hi Andy';
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // User one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interfacee))
    .deploy({ data: bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: '1000000' });
})

describe('Inbox', () => {

  it('deploys a contract', () =>{
    assert.ok(inbox.options.address);
  })

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    // call is instancely
    assert.equal(message, initialMessage)
  })
  
  it('can setMessage', async () => {
    await inbox.methods.setMessage('Hi, new Andy').send({ from: accounts[0] });
    // send is not instancely
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi, new Andy')
  })
})