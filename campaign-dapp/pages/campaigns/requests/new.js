import React from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';

import Layout from '../../../components/Layout';
import web3 from '../../../contract/web3';
import Campaign from '../../../contract/campaign';
import { Router } from '../../../routes';

export default class New extends React.Component {
  state = {
    description: '',
    value: '',
    recipient: '',
    errorMessage: '',
    loading: false
  }
  static getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }
  onSubmit = async (evt) => {
    evt.preventDefault();
    this.setState({ loading:true, errorMessage: '' });
    const accounts = await web3.eth.getAccounts();
    if(accounts && accounts.length==0){
      this.setState({ loading:false, errorMessage: 'please unlock your metamask!' });
      return;
    }
    const { address } = this.props;
    const campaign = Campaign(address);
    const { description,recipient,value } = this.state;
    try{
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({
        from: accounts[0],
        gas: '1000000'
      });
      this.setState({ loading:false, errorMessage: '' });
      Router.pushRoute(`/campaigns/${this.props.query.address}`);
    }catch(err){
      this.setState({ loading:false, errorMessage: err.message.toString().split('\n')[0] });
    }
  }
  render() {
    return (<Layout>
      <h3>Create a New Request</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
        <label>Description</label>
        <Form.TextArea
          required
          value={this.state.description}
          disabled={this.state.loading}
          onChange={evt=>this.setState({description: evt.target.value, errorMessage: '' })}
        />
      </Form.Field>
      <Form.Field>
        <label>Value (in ether)</label>
        <Input
          required
          value={this.state.value}
          disabled={this.state.loading}
          onChange={evt=>this.setState({value: evt.target.value, errorMessage: '' })}
        />
      </Form.Field>
      <Form.Field>
        <label>Recipient</label>
        <Input
          required
          value={this.state.recipient}
          disabled={this.state.loading}
          onChange={evt=>this.setState({recipient: evt.target.value, errorMessage: '' })}
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
      >Create!</Button>
    </Form></Layout>)
  }
}