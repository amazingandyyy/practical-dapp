import React from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../../contract/campaign';
import web3 from '../../contract/web3';
import { Router } from '../../routes';

export default class ContributeForm extends React.Component {
  state = {
    value: '',
    loading: false,
    errorMessage: ''
  }

  onSubmit = async (evt) => {
    evt.preventDefault();
    this.setState({ loading:true, errorMessage: '' });
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    if(accounts && accounts.length==0){
      this.setState({ loading:false, errorMessage: 'please unlock your metamask!' });
      return;
    }
    try{
      await campaign.methods.contribute().send({ from: accounts[0], value: web3.utils.toWei(this.state.value, 'ether') });
      this.setState({ loading: false, errorMessage: '', value:'' });
      Router.pushRoute(`/campaigns/${this.props.address}`);
    } catch(err) {
      this.setState({ loading: false, errorMessage: err.message.toString().split('\n')[0] });
    }

  }
  render() {
    return (<Form onSubmit={this.onSubmit}  error={!!this.state.errorMessage}>
      <Form.Field>
        <label>Amount to Contribute ({`around ${web3.utils.toWei(this.state.value.toString() || '0', 'ether')} wei`})</label>
        <Input
          label='ether'
          labelPosition='right'
          value={this.state.value}
          disabled={this.state.loading}
          onChange={(evt)=>this.setState({ value: evt.target.value, errorMessage: '' })}
        />
      </Form.Field>

      <Message
          error
          header='Oops'
          content={this.state.errorMessage}
        />

      <Button 
        type='submit'
        primary
        disabled={this.state.loading}
        loading={this.state.loading}
      >Contribure</Button>

    </Form>)
  }
}