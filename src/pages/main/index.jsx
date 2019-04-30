// vendor
import React, { Component } from 'react';
import moment from 'moment';

// locals
import CompareList from '../../components/compare-list';
import api from '../../services/api';

import logo from '../../assets/img/logo.png';
import { Container, Form } from './styles';

// app
export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
  }

  set repositoryInput(repositoryInput) {
    this.setState({ repositoryInput });
  }

  get repositoryInput() {
    return this.state.repositoryInput;
  }

  set repositories(repository) {
    const { repositories } = this;
    repositories.push(repository);
    this.setState({ repositories });
  }

  get repositories() {
    return this.state.repositories;
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    try {
      const { data: repository } = await api.get(`repos/${this.repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.repositories = repository;
      this.repositoryInput = '';
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { repositories } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="Usuário/repositório"
            onChange={e => this.repositoryInput = e.target.value}
          />
          <button type="submit">
          OK
          </button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
