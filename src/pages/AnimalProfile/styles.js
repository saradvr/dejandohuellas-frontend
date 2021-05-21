import styled from 'styled-components';
import { StyledMain } from '../../components/Main';

export const InformationSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media screen and (min-width: 1024px) {
    flex-wrap: nowrap;
    padding: 0 50px;
  }
`;

export const ImageContainer = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  align-items: center;

  @media screen and (min-width: 375px) {
    max-width: 70%;
  }

  @media screen and (min-width: 425px) {
    max-width: 60%;
  }

  @media screen and (min-width: 768px) {
    max-width: 40%;
  }

  @media screen and (min-width: 1024px) {
    max-width: 35%;
    margin: 0 auto;
    flex-basis: 0;
    flex-grow: 1;
  }
`;

export const StyledProfilePicture = styled.img`
  margin: 0 auto;
  border-radius: 10px;
  width: 100%;
  box-shadow: black 0px 0px 15px 0px;
`;

export const PrincipalInformationDiv = styled.div`
  padding: 20px;
  font-family: 'Snowy Night';
  text-align: center;

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  @media screen and (min-width: 1024px) {
    flex-basis: 0;
    flex-grow: 1;
  }

  @media screen and (min-width: 768px) {
    width: auto;
  }

  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    flex-basis: 0;
    flex-grow: 1;
  }
`;

export const NameH2 = styled.h2`
  align-self: center;
  text-shadow: -2px 2px white;
  color: #7e2559;
`;

export const ItemTitleP = styled.p`
  font-family: 'Snowy Night';
  font-style: normal;
  color: #227f83;
  display: inline;
  font-size: 26px;
`;

export const GroupInfoP = styled.p`
  font-family: 'Snowy Night';
  font-style: normal;
  font-size: 26px;
  color: black;
  margin: 0;
`;

export const HistoryDiv = styled.div`
  padding: 0 20px;
  margin: 20px 0;
  text-align: center;

  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    flex-basis: 0;
    flex-grow: 1;
  }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 425px) {
    flex-direction: row;
    justify-content: space-around;
    & button {
      margin: 0 10px 50px 0;
    }
  }
  @media screen and (min-width: 1024px) {
    & button {
      margin: 20px 10px;
    }
  }
`;

export const MainProfilePet = styled(StyledMain)`
  @media screen and (min-width: 768px) {
    height: 100%;
    padding-bottom: 30px;
  }
`;

export const Banner = styled.img`
  width: 100%;
`;
