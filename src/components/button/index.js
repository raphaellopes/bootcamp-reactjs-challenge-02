import React from 'react';
import { node, string } from 'prop-types';

import { ButtonStyle } from './styles';

const Button = ({ children, type, ...props }) => (
  <ButtonStyle type={type} {...props}>
    {children}
  </ButtonStyle>
);

Button.propTypes = {
  children: node.isRequired,
  type: string,
};

Button.defaultProps = {
  type: 'submit',
};

export default Button;
