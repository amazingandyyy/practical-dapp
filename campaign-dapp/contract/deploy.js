require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compileFactory = require('./build/CampaignFactory.json');
const { interface, bytecode } = compileFactory;
const { mnemonic } = require('./config');

const provider = new HDWalletProvider(
  mnemonic,
  'https://rinkeby.infura.io/PgVZEzt3DB0RVs5xyKKw'
)

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('accounts', accounts);

  const deployed = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('contract address', deployed.options.address);

}

deploy();