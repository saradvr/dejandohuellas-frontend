import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { updateRequest } from '../../store/adoptionReducer';
import { getPerson } from '../../store/personReducer';
import { Button } from '../Button';
import { ModalMessage } from '../ModalMessage';
import { StyledArticle, PetImage, AnimalNameH2 } from './styles';

export function PersonRequest({ request }) {
  const {
    animal: { name, ong, profilePicture },
    status,
    _id,
  } = request;
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  return (
    <StyledArticle>
      <PetImage src={profilePicture} alt="Foto de perfil del animal" />
      <AnimalNameH2>{name}!</AnimalNameH2>
      <p>{ong.user.name}</p>
      <p>
        <strong>Estado: </strong>
      </p>
      <p>{status}</p>
      <Button type="button" onClick={(e) => setShowConfirm(true)}>
        Solicitar Retiro Solicitud
      </Button>
      <ModalMessage
        show={showConfirm}
        onHide={(e) => setShowConfirm(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro de que deseas que la fundación retire tu solicitud?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => setShowConfirm(false)}>No</Button>
          <Button
            onClick={(e) => {
              dispatch(updateRequest('Retirada', _id, dispatch(getPerson())));
              setShowConfirm(false);
            }}
          >
            Sí
          </Button>
        </Modal.Footer>
      </ModalMessage>
    </StyledArticle>
  );
}
