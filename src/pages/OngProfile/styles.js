import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

export const ModalValorDonacion = styled(Modal)`
  & .modal-content {
    text-align: center;
    border-radius: 10px;
  }
  & .modal-header {
    display: unset;
    font-family: 'Snowy Night';
    background-color: #227f83;
    color: #f6f4eb;
  }
`;

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

export const InfoONG = styled.section`
  padding: 20px;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`;

export const LogoContainer = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  align-items: center;
  @media screen and (min-width: 768px) {
    grid-column: 1;
  }
`;

export const StyledLogo = styled.img`
  margin: 0 auto;
`;

export const DescriptionContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
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
  font-size: 18px;
`;

export const Message = styled.p`
  font-family: 'Lato';
  font-weight: 400;
  font-style: italic;
  font-size: 18px;
`;
