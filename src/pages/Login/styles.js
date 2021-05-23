import styled from 'styled-components';
import fondo from './login.png';

export const ImgSection = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  margin-top: 4%;

  @media screen and (min-width: 768px) {
    background-image: url(${fondo});
    background-repeat: no-repeat;
    background-size: cover;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    width: 100%;
    background-position: right;
  }

  @media screen and (min-width: 1440px) {
    margin-top: 2%;
  }
`;

export const LoginForm = styled.form`
  background-color: rgba(246, 244, 235, 0.44);
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  height: 250px;
  width: 90%;
  text-align: center;
  grid-column: 1;

  @media screen and (min-width: 1024px) {
    width: 75%;
  }
`;

export const StyledTitle = styled.h1`
  grid-column: 1;
  font-family: 'Snowy Night';
  align-self: center;
  color: black;

  @media screen and (min-width: 768px) {
    font-size: 7vw;
  }
`;
