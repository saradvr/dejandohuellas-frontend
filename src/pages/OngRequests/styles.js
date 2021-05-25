import styled from 'styled-components';
import { StyledMain } from '../../components/Main';

export const FiltersSection = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 30px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const FilterGroup = styled.div`
  @media screen and (min-width: 768px) {
    width: 50%;
    select {
      max-width: 300px;
    }
  }
`;

export const RequestsSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  margin-bottom: 60px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export const OngRequestsMain = styled(StyledMain)`
  height: ${(props) => (props.numberRequests === 0 ? '100%' : 'auto')};

  @media screen and (min-width: 1440px) {
    height: ${(props) => (props.numberRequests <= 4 ? '100%' : 'auto')};
  }

  @media screen and (min-height: 971px) {
    height: ${(props) => (props.numberRequests <= 4 ? '100%' : 'auto')};
  }
`;
