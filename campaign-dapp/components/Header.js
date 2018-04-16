import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes';

export default (props) => (
  <Menu style={{ 'margin': '20px auto 10px' }}>
    <Link route='/'>
      <Menu.Item>
        EthCampaign
      </Menu.Item>
    </Link>
    <Menu.Menu position='right'>
      <a href='https://github.com/amazingandyyy/ether-dev' target='_blank'>
        <Menu.Item>Github</Menu.Item>
      </a>
    </Menu.Menu>
</Menu>);