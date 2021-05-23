import styled from 'styled-components';
import backImage from '../../components/Images/Fondo.png';

export const StyledMain = styled.main`
  background-image: url(${backImage});
  background-size: contain;
  position: absolute;
  width: 100%;
  height: ${(props) => (props.height ? props.height : '100%')};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: ${(props) => (props.justify ? props.justify : '')};
`;
