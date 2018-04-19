import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../contract/web3';
import Campaign from '../contract/campaign';

export default class RequestRow extends React.Component {
  state = {
    errorMessage: '',
    loading: false,
    loading2: false
  }
  async onApprove (index){
    this.setState({ loading:true, errorMessage: '' });
    const accounts = await web3.eth.getAccounts();
    if(accounts && accounts.length==0){
      this.setState({ loading:false, errorMessage: 'please unlock your metamask!' });
      return;
    }
    const { address } = this.props;
    const campaign = Campaign(address);
    try{
      await campaign.methods.approveRequest(
        index
      ).send({
        from: accounts[0],
        gas: '1000000'
      });
      this.setState({ loading:false, errorMessage: '' });
      Router.pushRoute(`/campaigns/${address}/requests`);
    }catch(err){
      this.setState({ loading:false, errorMessage: err.message.toString().split('\n')[0] });
    }
  }
  async onFinalize(index) {
    this.setState({ loading2:true, errorMessage: '' });
    const accounts = await web3.eth.getAccounts();
    if(accounts && accounts.length==0){
      this.setState({ loading2:false, errorMessage: 'please unlock your metamask!' });
      return;
    }
    const { address } = this.props;
    const campaign = Campaign(address);
    try{
      await campaign.methods.finalizeRequest(
        index
      ).send({
        from: accounts[0],
        gas: '1000000'
      });
      this.setState({ loading2:false, errorMessage: '' });
      Router.pushRoute(`/campaigns/${address}/requests`);
    }catch(err){
      this.setState({ loading2:false, errorMessage: err.message.toString().split('\n')[0] });
    }
  }
  render() {
    const { Row, Cell } = Table;
    const { request, approversCount } = this.props;
    const readyToFinalize = (request.approvalCount > approversCount / 2);
    return (<Row disabled={request.complete} positive={!request.complete && readyToFinalize}>
      <Cell>{this.props.id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{request.approvalCount}/{approversCount}</Cell>
      <Cell>
        <Button
          onClick={this.onApprove.bind(this, this.props.id)} 
          color='green'
          basic
          disabled={this.state.loading || request.complete}
          loading={this.state.loading}
        >Approve</Button>
      </Cell>
      <Cell>{
        (request.complete)? 'Done' : <Button
          onClick={this.onFinalize.bind(this, this.props.id)}
          color='yellow'
          basic
          disabled={!readyToFinalize || this.state.loading2}
          loading={this.state.loading2}
        >Finalize</Button>
      }</Cell>
    </Row>)
  }
}