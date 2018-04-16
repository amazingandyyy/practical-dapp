import React from 'react';
import factory from '../contract/factory';

export default class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  render() {
    return <div>{this.props.campaigns[0]}</div>
  }
}