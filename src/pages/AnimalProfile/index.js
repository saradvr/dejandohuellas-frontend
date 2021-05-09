import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { getAnimal } from '../../store/animalReducer';
import Modal from 'react-bootstrap/Modal';
import { SHOW_MODAL, HIDE_MODAL } from '../../store/animalReducer';
import { AnimalForm } from '../../components/AnimalForm';

export function AnimalProfile(edit) {
  const dispatch = useDispatch();
  const { animalId } = useParams();
  useEffect(() => {
    dispatch(getAnimal(animalId));
  }, [dispatch, animalId]);

  const { animal, showModal } = useSelector(({ animalReducer }) => ({
    animal: animalReducer.animal,
    showModal: animalReducer.showModal,
  }));

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
      <Header />
      <main>
        <img src={profilePicture} alt="Perfil del peludo" />
        <section>
          <h2>{name}</h2>
          <h3>
            Edad: {ageYears} {time}
          </h3>
          <h3>Tamaño: {size}</h3>
          <h3>Sexo: {sex}</h3>
          <h3>ONG: {!!ong && ong.user.name}</h3>
          <h3>Ciudad: {city}</h3>
        </section>
        <section>
          <p>{history}</p>
        </section>
        <section>
          <Button type="button" onClick={(e) => dispatch({ type: SHOW_MODAL })}>
            Actualizar información
          </Button>
        </section>
        <Modal
          show={showModal}
          onHide={(e) => dispatch({ type: HIDE_MODAL })}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>Actualiza mi información</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AnimalForm update={true} animalId={animalId} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={(e) => dispatch({ type: HIDE_MODAL })}
              type="button"
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
}
