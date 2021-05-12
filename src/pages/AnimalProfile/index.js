import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { deleteAnimal, getAnimal } from '../../store/animalReducer';
import Modal from 'react-bootstrap/Modal';
import { SHOW_MODAL, HIDE_MODAL } from '../../store/animalReducer';
import { AnimalForm } from '../../components/AnimalForm';
import { StyledModal } from '../../components/ModalAnimalInfo';
import { ModalMessage } from '../../components/ModalMessage';
import banner from './Perfil-animal.png';
import {
  InformationSection,
  ImageContainer,
  StyledProfilePicture,
  PrincipalInformationDiv,
  NameH2,
  ItemTitleP,
  GroupInfoP,
  HistoryDiv,
  ButtonsDiv,
  MainProfilePet,
  Banner,
} from './styles';

export function AnimalProfile({ edit }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  const { animalId } = useParams();
  useEffect(() => {
    dispatch(getAnimal(animalId));
  }, [dispatch, animalId]);

  const { animal, showModal, loading, error } = useSelector(
    ({ animalReducer }) => ({
      animal: animalReducer.animal,
      showModal: animalReducer.showModal,
      loading: animalReducer.loading,
      error: animalReducer.error,
    })
  );

  if (!animal) return;

  const { name, age, size, sex, ong, city, profilePicture, history } = animal;

  let time = age === 1 ? 'mes' : 'meses';
  let ageYears = age;
  if (age > 12) {
    ageYears = Math.ceil(age / 12);
    time = ageYears === 1 ? 'año' : 'años';
  }

  return (
    <>
      <Header sticky={'top'} />
      <MainProfilePet height={'auto'}>
        {!!loading && <p>Cargando información...</p>}
        {!!error && <p>Hubo un error, por favor intente nuevamente.</p>}
        <Banner src={banner} alt="Banner del perfil del animal" />
        <InformationSection>
          <ImageContainer>
            <StyledProfilePicture
              src={profilePicture}
              alt="Perfil del peludo"
            />
          </ImageContainer>
          <PrincipalInformationDiv>
            <NameH2>{name}</NameH2>
            <GroupInfoP>
              <ItemTitleP>Edad: </ItemTitleP>
              {ageYears} {time}
            </GroupInfoP>
            <GroupInfoP>
              <ItemTitleP>Tamaño: </ItemTitleP>
              {size}
            </GroupInfoP>
            <GroupInfoP>
              <ItemTitleP>Sexo: </ItemTitleP>
              {sex}
            </GroupInfoP>
            <GroupInfoP>
              <ItemTitleP>Ciudad: </ItemTitleP>
              {city}
            </GroupInfoP>
            <GroupInfoP>
              <ItemTitleP>Fundación: </ItemTitleP>
              {!!ong && ong.user.name}
            </GroupInfoP>
          </PrincipalInformationDiv>
          <HistoryDiv>
            <ItemTitleP>Un poco de mi historia...</ItemTitleP>
            <p>{history}</p>
            {!!edit && (
              <ButtonsDiv>
                <Button
                  type="button"
                  onClick={(e) => dispatch({ type: SHOW_MODAL })}
                >
                  Actualizar información
                </Button>
                <Button
                  type="button"
                  onClick={(e) => setShowConfirmDelete(true)}
                >
                  Eliminar este peludo
                </Button>
              </ButtonsDiv>
            )}
          </HistoryDiv>
        </InformationSection>
        <StyledModal
          show={showModal}
          onHide={(e) => dispatch({ type: HIDE_MODAL })}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Actualiza mi información</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AnimalForm update={true} animalId={animalId} />
          </Modal.Body>
        </StyledModal>
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
            <Button onClick={(e) => dispatch(deleteAnimal(animalId))}>
              Eliminar
            </Button>
          </Modal.Footer>
        </ModalMessage>
      </MainProfilePet>
    </>
  );
}
