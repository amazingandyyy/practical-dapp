import React from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../contract/factory';
import web3 from '../../contract/web3';
import { Router } from '../../routes';

export default class New extends React.Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }
  onSubmit = async (evt) =>{
    evt.preventDefault();
    this.setState({ loading:true, errorMessage: '' });
    const accounts = await web3.eth.getAccounts();
    if(accounts && accounts.length==0){
      this.setState({ loading:false, errorMessage: 'please unlock your metamask!' });
    }
    try {
      await factory.methods.createCampaign(this.state.minimumContribution).send({ from: accounts[0] });
      this.setState({ loading:false, errorMessage: '' });
      Router.pushRoute('/');
    } catch(err) {
      this.setState({ loading:false, minimumContribution:'', errorMessage: err.message.toString().split('\n')[0] });
    }
  }
  render() {
    return <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input 
            label='wei' labelPosition='right'  
            value={this.state.minimumContribution}
            onChange={evt=>this.setState({minimumContribution: evt.target.value, errorMessage: '' })}
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
          loading={this.state.loading}
        >Create!</Button>
      </Form>
    </Layout>
  }
}