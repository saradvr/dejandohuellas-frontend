import styled from 'styled-components';
import { StyledMain } from '../../components/Main';

export const StyledProfilePicture = styled.img`
  margin: 0 auto;
  border-radius: 10px;
  width: 100%;
  box-shadow: black 0px 0px 15px 0px;
`;

export const StyledNameH2 = styled.h2`
  color: #227f83;
  font-family: 'Snowy Night';
  text-align: center;
  margin-top: 20px;
  text-shadow: -2px 2px 0px white;

  @media screen and (min-width: 768px) {
    margin-top: 50px;
    font-size: 50px;
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: 20px;
    font-size: 70px;
  }
`;

export const AnimalSection = styled.section`
  max-width: 300px;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 0;
    flex-grow: 1;
  }

  @media screen and (min-width: 1024px) {
    width: 33%;
  }
`;

export const PersonSection = styled.section`
  p {
    margin: 0;
  }
  @media screen and (min-width: 768px) {
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
    input {
      width: 70%;
    }
  }
`;

export const RequestSection = styled.section`
  @media screen and (min-width: 768px) {
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    textarea {
      height: 175px;
    }
    button {
      margin-bottom: 15px;
    }
  }

  @media screen and (min-width: 1024px) {
    textarea {
      height: 200px;
    }
  }
`;

export const StyledForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 30px auto;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    margin-top: 30px;
    justify-content: space-around;
  }

  @media screen and (min-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Banner = styled.img`
  width: 100%;
`;

export const AdoptMain = styled(StyledMain)`
  height: auto;

  @media screen and (min-width: 768px) {
    height: 100%;
  }
`;
