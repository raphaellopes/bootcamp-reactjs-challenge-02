import React from 'react';
import {
  arrayOf, shape, string, number, func,
} from 'prop-types';

import Button from '../button';
import { Container, Repository } from './styles';

const CompareList = ({
  repositories, onDeleteClick, onUpdateClick,
}) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
          />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repository.lastCommit} <small>last commit</small>
          </li>
        </ul>

        <div className="actions">
          <Button
            type="button"
            onClick={() => onUpdateClick(repository.id)}
          >
            Atualizar
          </Button>

          <Button
            className="error"
            type="button"
            onClick={() => onDeleteClick(repository.id)}
          >
              Remover
          </Button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired,
    owner: shape({
      login: string.isRequired,
      avatar_url: string.isRequired,
    }),
    stargazers_count: number.isRequired,
    forks_count: number.isRequired,
    open_issues_count: number.isRequired,
    pushed_at: string.isRequired,
  })).isRequired,
  onDeleteClick: func.isRequired,
  onUpdateClick: func.isRequired,
};

export default CompareList;
