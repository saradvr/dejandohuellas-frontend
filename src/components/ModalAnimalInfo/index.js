import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  & .modal-content {
    text-align: center;
    border-radius: 10px;
  }
  & .modal-header {
    padding-left: 8%;
    font-family: 'Snowy Night';
    background-color: #227f83;
    color: #f6f4eb;
    font-size: 3vw;
  }
  & .modal-dialog-centered {
    margin: 0 auto;
    max-width: 90%;
  }
  & .modal-body {
    background-color: #f6f4eb;
    border-radius: 0 0 10px 10px;
  }
  & .close {
    font-size: 30px;
    color: #f6f4eb;
    font-family: 'Lato';
  }
`;
