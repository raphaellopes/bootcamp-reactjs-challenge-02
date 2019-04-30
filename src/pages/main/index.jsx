// vendor
import React from 'react';

// locals
import logo from '../../assets/img/logo.png';

import { Container, Form } from './styles';

// app
const Main = () => (
  <Container>
    <img src={logo} alt="Github Compare" />

    <Form>
      <input type="text" placeholder="Usuário/repositório" />
      <button type="submit">
        OK
      </button>
    </Form>
  </Container>
);

export default Main;
