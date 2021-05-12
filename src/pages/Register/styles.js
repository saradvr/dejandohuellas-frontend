import styled from 'styled-components';
import fondo from './register.png';

export const StyledForm = styled.form`
  background-color: rgba(246, 244, 235, 0.44);
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  height: auto;
  width: 500px;
  text-align: center;
  grid-column: 1;
`;

export const ImgSection = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;

  @media screen and (min-width: 768px) {
    background-image: url(${fondo});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: -400px;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    width: 100%;
  }

  @media screen and (min-width: 1024px) {
    background-position: right;
  }
`;

export const StyledTitle = styled.h1`
  grid-column: 1;
  font-family: 'Snowy Night';
  align-self: end;
  color: black;

  @media screen and (min-width: 768px) {
    font-size: 7vw;
  }
`;
