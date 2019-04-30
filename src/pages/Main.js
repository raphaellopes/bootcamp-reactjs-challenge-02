// vendor
import React from 'react';
import styled from 'styled-components';

// locals
import logo from '../assets/img/logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 55px;
    background: #fff;
    color: #444;
    border-radius: 3px;
    padding: 0 20px;
    border: 0;
  }

  button {
    border: 0;
    height: 55px;
    padding: 0 20px;
    margin-left: 10px;
    background: #63f5b8;
    border-radius: 3px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: #52d89f;
    }
  }
`;

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
