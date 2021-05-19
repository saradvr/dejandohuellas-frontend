import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LoadingPawPrints } from '../../components/LoadingPawPrints';
import { StyledMain } from '../../components/Main';
import { ModalMessage } from '../../components/ModalMessage';
import { getRequest, deleteRequest } from '../../store/adoptionReducer';
import Modal from 'react-bootstrap/Modal';

export function RequestInformation() {
  const { requestId } = useParams();
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch(getRequest(requestId));
  }, [dispatch, requestId]);

  const { request, loading, error } = useSelector(({ adoptionReducer }) => ({
    request: adoptionReducer.request,
    loading: adoptionReducer.loading,
    error: adoptionReducer.error,
  }));

  if (!request) return;
  const { animal, message, person, status, _id } = request;

  return (
    <>
      <Header />
      <StyledMain>
        {!!loading && <LoadingPawPrints show={loading} />}
        <section>AnimalInfo</section>
        <section>Solicitud Info</section>
        <Button type="button" onClick={(e) => setShowConfirmDelete(true)}>
          Eliminar esta solicitud
        </Button>
        <ModalMessage
          show={showConfirmDelete}
          onHide={(e) => setShowConfirmDelete(false)}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estás seguro que deseas eliminarlo?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => setShowConfirmDelete(false)}>
              Cancelar
            </Button>
            <Button onClick={(e) => dispatch(deleteRequest(_id))}>
              Eliminar
            </Button>
          </Modal.Footer>
        </ModalMessage>
      </StyledMain>
    </>
  );
}
