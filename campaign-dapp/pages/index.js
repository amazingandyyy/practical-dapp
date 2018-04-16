import React from 'react';

import factory from '../contract/factory';

import Layout from '../components/Layout';
import { Card, Button } from 'semantic-ui-react'

export default class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }
  renderCampaign() {
    const items = this.props.campaigns.map(address=>({
      header: address,
      description: <a>View Campaign</a>,
      fluid: true
    }))
    return <Card.Group items={items} />
  }

  render() {
    return <Layout>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      <h3>Open Campaign</h3>
      <Button
        floated='right'
        content='Create Campaign'
        icon='add square'
        primary
        />
      {this.renderCampaign()}
    </Layout>
  }
}