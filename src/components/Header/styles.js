import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainNav = styled.section`
  background-color: #227f83;
  width: 100%;
  padding: 20px;
  text-align: center;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 5fr;
  }
`;

export const NavSection = styled.nav`
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    grid-column: 2;
  }
`;

export const LogoSection = styled.section`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    grid-column: 1;
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
