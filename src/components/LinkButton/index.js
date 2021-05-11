import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkButton = styled(Link)`
  font-family: 'Snowy Night';
  background-color: #227f83;
  color: #f6f4eb;
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  display: block;
  margin: 20px auto;

  &:hover {
    cursor: pointer;
    background-color: #85c7b5;
    color: #f6f4eb;
    text-decoration: none;
  }

  &:active {
    background-color: #85c7b5;
  }

  @media screen and (min-width: 768px) {
    width: 200px;
  }
`;
