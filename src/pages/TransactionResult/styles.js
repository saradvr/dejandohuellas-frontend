import styled from 'styled-components';
import { StyledMain } from '../../components/Main';

export const ResultContainer = styled.section`
  background-color: rgba(246, 244, 235, 0.44);
  border-radius: 10px;
  padding: 20px;
  margin: 50px auto;
  text-align: center;
  width: 80%;

  @media screen and (min-width: 768px) {
    width: auto;
  }
`;

export const StyledP = styled.p`
  font-family: 'Snowy Night';
  font-size: 1em;
  font-style: normal;
  color: black;

  @media screen and (min-width: 768px) {
    font-size: 2em;
  }

  @media screen and (min-width: 1440px) {
    font-size: 3em;
  }
`;

export const StyledPResult = styled.p`
  font-family: 'Snowy Night';
  font-size: 2em;
  font-style: normal;
  color: #227f83;
  margin: 0;

  @media screen and (min-width: 768px) {
    font-size: 3em;
  }

  @media screen and (min-width: 1440px) {
    font-size: 4em;
  }
`;

export const Banner = styled.img`
  width: 100%;
`;

export const TransactionMain = styled(StyledMain)`
  justify-content: center;
`;
