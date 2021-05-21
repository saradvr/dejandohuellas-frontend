import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LoadingPawPrints } from '../../components/LoadingPawPrints';
import { ModalMessage } from '../../components/ModalMessage';
import {
  getRequest,
  deleteRequest,
  updateRequest,
} from '../../store/adoptionReducer';
import Modal from 'react-bootstrap/Modal';
import { FormSelect } from '../../components/FormSelect';
import {
  GroupInfoP,
  ItemTitleP,
  NameH2,
  StyledProfilePicture,
} from '../AnimalProfile/styles';
import {
  InfoAnimalSection,
  PersonInfoDiv,
  PhotoDiv,
  RequestInfoSection,
  RequestMain,
  GroupInfoDiv,
  ButtonsStatusDiv,
  AnimalInformationDiv,
  StatusDiv,
} from './styles';
import { FormLabel } from '../../components/FormLabel';

export function RequestInformation() {
  const { requestId } = useParams();
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    dispatch(getRequest(requestId));
  }, [dispatch, requestId]);

  const { request, loading, error } = useSelector(({ adoptionReducer }) => ({
    request: adoptionReducer.request,
    loading: adoptionReducer.loading,
    error: adoptionReducer.error,
  }));

  useEffect(() => {
    setNewStatus(request.status);
  }, [request]);

  if (!request) return;
  const { animal, message, person, status, _id } = request;

  let time = '';
  let ageYears = 0;

  if (!!animal) {
    time = animal.age === 1 ? 'mes' : 'meses';
    ageYears = animal.age;
    if (animal.age > 12) {
      ageYears = Math.ceil(animal.age / 12);
      time = ageYears === 1 ? 'año' : 'años';
    }
  }

  return (
    <>
      <Header />
      <RequestMain>
        {!!loading && <LoadingPawPrints show={loading} />}
        {!!error && (
          <p>
            Hubo un error al cargar la información. Por favor, intente de nuevo.
          </p>
        )}
        {!!animal && (
          <InfoAnimalSection>
            <PhotoDiv>
              <StyledProfilePicture
                src={animal.profilePicture}
                alt="Foto del peludo"
              />
            </PhotoDiv>
            <AnimalInformationDiv>
              <NameH2>{animal.name}</NameH2>
              <GroupInfoP>
                <ItemTitleP>Edad: </ItemTitleP>
                {ageYears} {time}
              </GroupInfoP>
              <GroupInfoP>
                <ItemTitleP>Tamaño: </ItemTitleP>
                {animal.size}
              </GroupInfoP>
              <GroupInfoP>
                <ItemTitleP>Sexo: </ItemTitleP>
                {animal.sex}
              </GroupInfoP>
              <GroupInfoP>
                <ItemTitleP>Ciudad: </ItemTitleP>
                {animal.city}
              </GroupInfoP>
            </AnimalInformationDiv>
          </InfoAnimalSection>
        )}
        <RequestInfoSection>
          <p>{message}</p>
          {!!person && (
            <PersonInfoDiv>
              <GroupInfoDiv>
                <p>Nombre: </p>
                <p>{person.user.name}</p>
              </GroupInfoDiv>
              <GroupInfoDiv>
                <p>Correo: </p>
                <p>{person.user.email}</p>
              </GroupInfoDiv>
              <GroupInfoDiv>
                <p>Teléfono: </p>
                <p>{person.phone}</p>
              </GroupInfoDiv>
              <GroupInfoDiv>
                <p>Ciudad: </p>
                <p>{person.city}</p>
              </GroupInfoDiv>
            </PersonInfoDiv>
          )}
          <ButtonsStatusDiv>
            <StatusDiv>
              <FormLabel htmlFor="status">Estado de la solicitud:</FormLabel>
              <FormSelect
                name="status"
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                defaultValue={status}
              >
                <option value="Nueva">Nueva</option>
                <option value="En revisión">En revisión</option>
                <option value="Entrevista agendada">Entrevista agendada</option>
                <option value="Evaluación final">Evaluación final</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
                <option value="Retirada" disabled>
                  Retirada
                </option>
              </FormSelect>
            </StatusDiv>
            <StatusDiv>
              <Button
                type="button"
                onClick={(e) =>
                  newStatus !== status &&
                  dispatch(updateRequest(newStatus, _id))
                }
              >
                Guardar cambios
              </Button>
            </StatusDiv>
            <StatusDiv>
              <Button type="button" onClick={(e) => setShowConfirmDelete(true)}>
                Eliminar esta solicitud
              </Button>
            </StatusDiv>
          </ButtonsStatusDiv>
        </RequestInfoSection>
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
      </RequestMain>
    </>
  );
}
