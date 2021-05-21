import styled from 'styled-components';
import { StyledMain } from '../../components/Main';
import { PrincipalInformationDiv } from '../AnimalProfile/styles';

export const InfoAnimalSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 50px auto 10px auto;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    width: 80%;
  }

  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`;

export const PhotoDiv = styled.div`
  width: 80%;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    flex-basis: 0;
    flex-grow: 1;
  }
`;

export const AnimalInformationDiv = styled(PrincipalInformationDiv)`
  @media screen and (min-width: 768px) {
    flex-basis: 0;
    flex-grow: 1;
  }
`;

export const RequestInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;

  @media screen and (min-width: 768px) {
    margin-top: 30px;
  }
`;

export const RequestMain = styled(StyledMain)`
  height: auto;

  @media screen and (min-width: 768px) {
    height: 100%;
  }
`;

export const PersonInfoDiv = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    margin: 20px 0;
  }
`;

export const GroupInfoDiv = styled.div`
  text-align: center;
`;

export const ButtonsStatusDiv = styled.div`
  text-align: center;

  @media screen and (min-width: 768px) {
    display: flex;
    align-items: flex-end;

    button {
      flex-basis: 0;
      flex-grow: 1;
      margin: 0 auto;
    }

    select {
      width: 80%;
    }
  }
`;

export const StatusDiv = styled.div`
  @media screen and (min-width: 768px) {
    flex-basis: 0;
    flex-grow: 1;
  }
`;
