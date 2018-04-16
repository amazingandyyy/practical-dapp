import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';

export default (props) => (<div>
  <Header/>
  <Container>
    {props.children}
  </Container>
</div>);