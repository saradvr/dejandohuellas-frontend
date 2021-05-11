import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';

export const StyledNavBar = styled(Navbar)`
  background-color: #227f83 !important;
  & .nav-link {
    font-family: 'Snowy Night';
    color: #f6f4eb !important;
    margin: auto 15px;
    font-size: 20px;
  }

  & .navbar-collapse {
    justify-content: flex-end;
  }

  & .navbar-nav {
    text-align: right;
  }

  & .navbar-nav button {
    padding: 0.5rem 1rem;
    margin-right: 15px;
    padding-right: 0;
    align-self: flex-end;
  }

  @media screen and (min-width: 1024px) {
    & .nav-link {
      margin: auto 50px;
    }
  }
`;

export const HeaderLink = styled(Link)`
  font-family: 'Snowy Night';
  color: #f6f4eb;
  margin: auto 20px;
  text-decoration: none;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    color: #f6f4eb;
    text-decoration: none;
  }

  @media screen and (min-width: 1024px) {
    margin: auto 50px;
  }
`;

export const HeaderButton = styled.button`
  font-family: 'Snowy Night';
  color: #f6f4eb;
  margin: 0 20px;
  border: none;
  background-color: transparent;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    color: #f6f4eb;
    text-decoration: none;
  }
`;
