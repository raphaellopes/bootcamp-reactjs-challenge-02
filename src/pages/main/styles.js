import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

export const Form = styled.form`
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

    border: ${props => (props.withError ? '2px solid #f00' : 0)}
  }

  button {
    margin-left: 10px;
    width: 80px;
  }
`;

export const WrapSpin = styled.div`
  color: #fff;
  padding-top: 40px;
`;
