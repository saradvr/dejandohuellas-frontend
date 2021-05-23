import styled from 'styled-components';
import backImage from './fondoInicio.jpg';

export const InicioMain = styled.main`
  background-image: url(${backImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: -600px;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 40px;

  @media screen and (min-width: 630px) {
    background-position: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }
`;

export const TitleH1 = styled.h1`
  font-family: 'Snowy Night';
  color: #227f83;
  margin: 20px;

  @media screen and (min-width: 630px) {
    align-self: flex-end;
    font-size: 60px;
  }

  @media screen and (min-width: 1024px) {
    align-self: center;
  }
`;

export const MainSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

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
