import styled from 'styled-components';
import backImage from './fondoInicio.jpg';

export const InicioMain = styled.main`
  background-image: url(${backImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: -75vh;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 425px) {
    background-position: center;
  }

  @media screen and (min-width: 630px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }

  @media screen and (min-width: 1250px) {
    background-position: center top;
  }
`;

export const TitleH1 = styled.h1`
  font-family: 'Snowy Night';
  color: #227f83;
  margin: 20px;
  text-align: center;

  @media screen and (min-width: 630px) {
    align-self: flex-end;
    font-size: 60px;
  }
`;

export const MainSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 50px;

  a {
    width: 80%;
  }

  @media screen and (min-width: 630px) {
    justify-content: center;
    grid-column: 1;

    a {
      width: fit-content;
    }
  }
`;

export const DescriptionDiv = styled.div`
  width: 80%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px;
  p {
    margin: 0;
    padding: 0;
  }
`;
