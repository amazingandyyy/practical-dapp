import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../contract/campaign';
import RequestRow from '../../../components/RequestRow';
import web3 from '../../../contract/web3';

export default class Requests extends React.Component {
  static async getInitialProps(props) {
    const {address} = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const manager = await campaign.methods.manager().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((elm, i)=>{
        return campaign.methods.requests(i).call();
      })
    )
    return { address, requests, requestCount, approversCount, manager };
  }
  renderRows() {
    return this.props.requests.map((r, index)=>{
      return (<RequestRow 
        key={index}
        id={index}
        request={r}
        address={this.props.address}
        approversCount={this.props.approversCount}
      />)
    })
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return <Layout>
      <div style={{'padding': '20px 0px', 'marginBottom': '30px'}}>
        <h3 style={{'float': 'left'}}>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a><Button primary style={{'float': 'right'}}>Add Request</Button></a>
        </Link>
      </div>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalized</HeaderCell>
          </Row>
        </Header>
        <Body>
          {this.renderRows()}
        </Body>
      </Table>
      <div>Found {this.props.requestCount} requests.</div>
    </Layout>
  }
}