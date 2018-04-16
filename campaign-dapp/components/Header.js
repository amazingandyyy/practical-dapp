import React from 'react';
import { Menu, Segment } from 'semantic-ui-react'

export default (props) => (<Segment >
  <Menu secondary>
  <Menu.Item>
    EthCampaign
  </Menu.Item>
  <Menu.Menu position='right'>
    <Menu.Item>Campaigns</Menu.Item>
    <Menu.Item>+</Menu.Item>
  </Menu.Menu>
</Menu>
</Segment>);