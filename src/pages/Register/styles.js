import styled from 'styled-components';
import { StyledMain } from '../../components/Main';
import fondo from './register.png';

export const StyledForm = styled.form`
  background-color: rgba(246, 244, 235, 0.44);
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto 30px;
  height: auto;
  width: 90%;
  text-align: center;

  @media screen and (min-width: 768px) {
    grid-column: 1;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ImgSection = styled.section`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: grid;
    background-image: url(${fondo});
    background-repeat: no-repeat;
    background-size: cover;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    width: 100%;
    background-position: right;
  }

  @media screen and (max-height: 620px) and (min-width: 768px) {
    height: auto;
  }
`;

export const StyledTitle = styled.h1`
  font-family: 'Snowy Night';
  align-self: center;
  color: black;
  width: 100%;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-column: 1;
    font-size: 5vw;
  }
`;

export const RegisterMain = styled(StyledMain)`
  @media screen and (min-height: 525px) {
    height: 100%;
  }

  @media screen and (max-height: 620px) and (min-width: 768px) {
    height: auto;
  }
`;
