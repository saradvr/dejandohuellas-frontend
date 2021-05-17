import styled from 'styled-components';

export const Banner = styled.img`
  width: 100%;
`;

export const NombreONG = styled.h1`
  font-family: 'Snowy Night';
  font-size: 10vw;
  margin: 0 0 30px;
  color: black;
  text-align: center;
  @media screen and (min-width: 768px) {
    font-size: 4vw;
  }
`;

export const AnimalsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
`;

export const InfoONG = styled.section`
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  @media screen and (min-width: 1024px) {
    margin-top: 20px;
  }
`;

export const LogoContainer = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  align-items: center;
  margin: auto;
  @media screen and (min-width: 768px) {
    grid-column: 1;
  }
`;

export const StyledLogo = styled.img`
  margin: 0 auto;
  border-radius: 10px;
  width: 100%;
  max-width: 260px;
  box-shadow: black 0px 0px 15px 0px;
`;

export const DescriptionContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
  width: 90%;
  margin: auto;
  @media screen and (min-width: 768px) {
    grid-column: 2;

    & button {
      margin-right: 0;
    }
  }
`;

export const Description = styled.p`
  font-family: 'Lato';
  font-weight: 400;
  font-style: italic;
  font-size: 16px;
`;

export const Message = styled.p`
  font-family: 'Lato';
  font-weight: 400;
  font-style: italic;
  font-size: 18px;
  margin-bottom: 50px;
`;

export const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 425px) {
    flex-direction: row;
    justify-content: space-around;
    & button {
      margin: 20px 10px;
    }
  }
`;
