import React, { Component } from 'react';
import './App.css';

import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
    coinbase: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const accounts = await web3.eth.getAccounts();
    this.setState({ manager, players, balance, coinbase: accounts[0] });
  }

  onSubmit = async (evt) => {
    evt.preventDefault();
    if(!this.state.value) return;
    if(this.state.value < 0.01) return;
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on trasaction success...' })

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    }) // take 30 seconds

    this.setState({ message: 'You have been entered' })
  }

  pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on trasaction success...' })
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })
    this.setState({ message: 'Winner has been picked' });
  }

  render() {
    return (
      <div className='container'>
        <h2>Lottery Contract</h2>
        <p>This contract is created by <b>{this.state.manager}</b></p>
        <p>There are currently <b>{this.state.players.length} people</b> entered competing to win <b>{web3.utils.fromWei(this.state.balance, 'ether')} ethers</b>!</p>
        {this.state.players.map((p, i)=><pre>{i+1}.{p}</pre>)}
        <hr/>
        <h4>{this.state.message}</h4>
        {!this.state.message && <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={evt=>this.setState({ value: evt.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>}
        <hr/>
        {this.state.coinbase==this.state.manager && <button onClick={this.pickWinner}>Pick the Winner</button>}
      </div>
    );
  }
}

export default App;
