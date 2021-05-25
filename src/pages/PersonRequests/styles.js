import styled from 'styled-components';
import { StyledMain } from '../../components/Main';

export const RequestsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;

  @media screen and (min-width: 768px) {
    margin: 50px;
  }
`;

export const Banner = styled.img`
  width: 100%;
`;

export const MainPersonRequests = styled(StyledMain)`
  height: ${(props) => (props.numberRequests === 0 ? '100%' : 'auto')};

  @media screen and (min-height: 650px) {
    height: ${(props) => (props.numberRequests <= 1 ? '100%' : 'auto')};
  }

  @media screen and (min-width: 425px) {
    @media screen and (min-height: 650px) {
      height: ${(props) => (props.numberRequests === 0 ? '100%' : 'auto')};
    }
    @media screen and (min-height: 760px) {
      height: ${(props) => (props.numberRequests <= 1 ? '100%' : 'auto')};
    }
  }

  @media screen and (min-width: 1440px) {
    @media screen and (min-height: 760px) and (max-height: 950px) {
      height: ${(props) => (props.numberRequests === 0 ? '100%' : 'auto')};
    }
    @media screen and (min-height: 950px) {
      height: ${(props) => (props.numberRequests <= 4 ? '100%' : 'auto')};
    }
  }
`;
