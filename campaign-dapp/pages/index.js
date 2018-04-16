import React from 'react';
import { Card, Button } from 'semantic-ui-react'

import factory from '../contract/factory';

import { Link } from '../routes';
import Layout from '../components/Layout';

export default class Index extends React.Component {
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
      <h3>Open Campaign</h3>
      <Link route='/campaigns/new'>
        <Button
          floated='right'
          content='Create Campaign'
          icon='add square'
          primary
          />
      </Link>
      {this.renderCampaign()}
    </Layout>
  }
}