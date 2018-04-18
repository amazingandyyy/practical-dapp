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
    <Link route='/'>
      <Menu.Item>
        Campaigns
      </Menu.Item>
    </Link>
    <Menu.Menu position='right'>
      <Link route='/campaigns/new'>
        <Menu.Item>
          Create
        </Menu.Item>
      </Link>
      <Menu.Item>
        <a href='https://github.com/amazingandyyy/practical-dapp' target='_blank'>
            Github
        </a>
      </Menu.Item>
    </Menu.Menu>
</Menu>);