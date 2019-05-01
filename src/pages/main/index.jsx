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
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  }

  set repositoryInput(repositoryInput) {
    this.setState({ repositoryInput });
  }

  get repositoryInput() {
    const { repositoryInput } = this.state;
    return repositoryInput;
  }

  set repositories(repository) {
    const { repositories } = this.state;
    repositories.push(repository);
    this.setState({ repositories });
  }

  get repositories() {
    const { repositories } = this.state;
    return repositories;
  }

  set repositoryError(repositoryError) {
    this.setState({ repositoryError });
  }

  get repositoryError() {
    const { repositoryError } = this.state;
    return repositoryError;
  }

  get loading() {
    const { loading } = this.state;
    return loading;
  }

  set loading(loading) {
    this.setState({ loading });
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.loading = true;

    try {
      const { data: repository } = await api.get(`repos/${this.repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.repositories = repository;
      this.repositoryInput = '';
      this.repositoryError = false;
    } catch (err) {
      this.repositoryError = true;
    } finally {
      this.loading = false;
    }
  }

  render() {
    const { repositories } = this.state;

    const spinner = <i className="fa fa-spinner fa-pulse" />;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form
          onSubmit={this.handleAddRepository}
          withError={this.repositoryError}
        >
          <input
            type="text"
            placeholder="Usuário/repositório"
            onChange={e => this.repositoryInput = e.target.value}
          />
          <button type="submit">
            {this.loading ? spinner : 'OK'}
          </button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
