// vendor
import React, { Component } from 'react';
import moment from 'moment';
import localStorage from 'local-storage';

// locals
import CompareList from '../../components/compare-list';
import Button from '../../components/button';
import api from '../../services/api';

import logo from '../../assets/img/logo.png';
import { Container, Form, WrapSpin } from './styles';

// app
export default class Main extends Component {
  state = {
    loading: false,
    loadingUpdate: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  }

  // lifecicle
  componentDidMount() {
    const repositories = localStorage.get('repositories');

    if (repositories) {
      this.repositories = repositories;
    }
  }

  // setters
  set repositoryInput(repositoryInput) {
    this.setState({ repositoryInput });
  }

  get repositoryInput() {
    const { repositoryInput } = this.state;
    return repositoryInput;
  }

  set repositories(repositories) {
    this.setState({ repositories });
    localStorage.set('repositories', repositories);
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

  get loadingUpdate() {
    const { loadingUpdate } = this.state;
    return loadingUpdate;
  }

  set loadingUpdate(loadingUpdate) {
    this.setState({ loadingUpdate });
  }

  // handlers
  addRepository = (repository) => {
    const { repositories } = this.state;

    if (!this.repositoryExists(repository.id)) {
      repositories.push(repository);
      this.repositories = repositories;
    } else {
      console.log(`Repository id: ${repository.id} already added!`);
    }
  }

  repositoryExists = (id) => {
    const { repositories } = this.state;
    return repositories.find(r => r.id === id);
  }

  handleChange = (e) => {
    this.repositoryInput = e.target.value;
  }

  handleClear = () => {
    this.repositoryInput = '';
  }

  handleUpdate = async (id) => {
    const { full_name: fullName } = this.repositories.find(r => r.id === id);

    this.loadingUpdate = true;

    try {
      const repository = await this.handleApiRepo(fullName);
      const repositories = this.repositories.map((r) => {
        if (r.id === id) {
          return repository;
        }
        return r;
      });
      this.repositories = repositories;
    } catch (err) {
      console.log('Error on update', err);
    } finally {
      this.loadingUpdate = false;
    }
  }

  handleDelete = (id) => {
    const repositories = this.repositories.filter(r => r.id !== id);
    this.repositories = repositories;
  }

  handleApiRepo = async (repo) => {
    const { data: repository } = await api.get(`repos/${repo}`);

    repository.lastCommit = moment(repository.pushed_at).fromNow();
    return repository;
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.loading = true;

    try {
      const repository = await this.handleApiRepo(this.repositoryInput);
      this.addRepository(repository);
      this.repositoryError = false;
    } catch (err) {
      this.repositoryError = true;
    } finally {
      this.loading = false;
      this.handleClear();
    }
  }

  // renders
  render() {
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
            value={this.repositoryInput}
            onChange={this.handleChange}
          />
          <Button type="submit">
            {this.loading ? spinner : 'OK'}
          </Button>
        </Form>

        {this.loadingUpdate && (
          <WrapSpin>
            {spinner} Atualizando
          </WrapSpin>
        )}

        <CompareList
          repositories={this.repositories}
          onDeleteClick={this.handleDelete}
          onUpdateClick={this.handleUpdate}
        />
      </Container>
    );
  }
}
