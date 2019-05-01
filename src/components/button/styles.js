import styled from 'styled-components';

export const ButtonStyle = styled.button`
  border: 0;
  height: 55px;
  padding: 0 20px;
  border-radius: 3px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background: #63f5b8;

  &:hover {
    background: #52d89f;
  }

  &.error {
    background: #f00;

    &:hover {
      background: #dc0909;
    }
  }
`;
