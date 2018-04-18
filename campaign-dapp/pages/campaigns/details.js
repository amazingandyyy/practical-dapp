import React from 'react';

import web3 from '../../contract/web3';
import Layout from '../../components/Layout';
import campaign from '../../contract/campaign';
import { Card } from 'semantic-ui-react';

export default class CampsignDetails extends React.Component {
  
  static async getInitialProps(props) {
    const address = props.query.address;
    const _summary = await campaign(address).methods.getSummary().call();
    const _campaign = {
      minimumContributionInWei: _summary[0],
      balance: _summary[1],
      requestsCounts: _summary[2],
      approversCount: _summary[3],
      manager: _summary[4]
    }
    return {_campaign};
  }

  renderCards(){
    const {
      minimumContributionInWei,
      balance,
      requestsCounts,
      approversCount,
      manager
    } = this.props._campaign;

    const items = [{
      header: manager,
      meta: 'Address of Manager',
      description: 'The manager created this campaign and can create request to withdraw money',
      style: { overflowWrap: 'break-word' }
    },
    {
      header: minimumContributionInWei,
      meta: 'Minimum Contribution (in wei)',
      description: 'You must contribute at least this much in wei to become an approver'
    },
    {
      header: requestsCounts,
      meta: 'Number of Requests',
      description:'A request tries to withdraw money from the contract. Requests must be approved by >50% approvers.'
    },
    {
      header: approversCount,
      meta: 'Number of Approvers',
      description:'Number of people who have already donated to this campaign'
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign balance (ether)',
      description:'This is how much money this campaign has left to spend.'
    }];

    return <Card.Group items={items} />
  }

  render() {
    return <Layout>
      <h3>Campaign Details</h3>
      {this.renderCards()}
    </Layout>
  }
}