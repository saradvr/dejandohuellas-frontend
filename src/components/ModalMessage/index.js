import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

export const ModalMessage = styled(Modal)`
  & .modal-content {
    text-align: center;
    border-radius: 10px;
    border: none;
  }
  & .modal-header {
    display: unset;
    font-family: 'Snowy Night';
    background-color: #227f83;
    color: #f6f4eb;
    border-radius: 10px 10px 0 0;
  }

  & .modal-dialog-centered {
    max-width: 90%;
  }
`;
