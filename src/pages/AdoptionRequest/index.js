import { Header } from '../../components/Header';
import { StyledMain } from '../../components/Main';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPerson, updatePerson } from '../../store/personReducer';
import { Button } from '../../components/Button';
import { FormLabel } from '../../components/FormLabel';
import { Input } from '../../components/Input';
import { useHistory, useParams } from 'react-router';
import { getAnimal } from '../../store/animalReducer';
import { createRequest } from '../../store/adoptionReducer';
import { StyledTextArea } from '../../components/FormTextArea';
import { LoadingPawPrints } from '../../components/LoadingPawPrints';

export function AdoptionRequest() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState();
  const [finishedPerson, setFinishedPerson] = useState(false);
  const [finishedRequest, setFinishedRequest] = useState(false);
  const { animalId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPerson());
    dispatch(getAnimal(animalId));
  }, [dispatch, animalId]);

  const {
    person,
    errorPerson,
    loadingPerson,
    savingPerson,
    animal,
    errorAnimal,
    loadingAnimal,
    savingRequest,
    errorRequest,
  } = useSelector(({ personReducer, animalReducer, adoptionReducer }) => ({
    person: personReducer.person,
    errorPerson: personReducer.error,
    savingPerson: personReducer.saving,
    loadingPerson: personReducer.loading,
    animal: animalReducer.animal,
    errorAnimal: animalReducer.error,
    loadingAnimal: animalReducer.loading,
    savingRequest: adoptionReducer.saving,
    errorRequest: adoptionReducer.error,
  }));

  useEffect(() => {
    if (!!person && person.user) {
      setName(person.user.name);
      setPhone(person.phone);
      setCity(person.city);
    }
  }, [person]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updatePerson({ name, phone, city }, () => setFinishedPerson(true))
    );
    dispatch(
      createRequest(animalId, animal.ong._id, message, () =>
        setFinishedRequest(true)
      )
    );
  }

  useEffect(() => {
    if (finishedPerson === true && finishedRequest === true) {
      history.push('/solicitudes');
    }
  }, [finishedRequest, finishedPerson, history]);

  if (!person) return;

  return (
    <>
      <Header />
      <StyledMain>
        <section>
          {!!errorAnimal && (
            <p>Error al cargar información del peludo, intenta nuevamente.</p>
          )}
          <img src={animal.profilePicture} alt="Foto animal" />
          <h2>{animal.name}</h2>
        </section>
        {(!!loadingPerson || !!loadingAnimal) && (
          <LoadingPawPrints
            show={!!loadingPerson ? loadingPerson : loadingAnimal}
          />
        )}
        <form onSubmit={handleSubmit}>
          <section>
            {!!loadingPerson && <p>Cargando su información...</p>}
            <FormLabel htmlFor="name">Nombre: </FormLabel>
            {!!person && !!person.user && (
              <Input
                type="text"
                id="name"
                name="name"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <FormLabel htmlFor="email">Correo: </FormLabel>
            <p>{!!person && !!person.user && person.user.email}</p>
            <FormLabel htmlFor="phone">Número de celular: </FormLabel>
            <Input
              type="number"
              id="phone"
              name="phone"
              required={true}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormLabel htmlFor="city">Ciudad: </FormLabel>
            <Input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required={true}
            />
            {!!errorPerson && (
              <p>Hubo un error con su información, intente nuevamente.</p>
            )}
            {!!savingPerson && <p>Se está guardando su información.</p>}
          </section>
          <section>
            <FormLabel htmlFor="message">
              Cuéntanos por qué deseas adoptar este peludo:
            </FormLabel>
            <StyledTextArea
              placeholder="Escribe un poco sobre ti..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required={true}
            />
          </section>
          {!!errorRequest && (
            <p>Hubo un error para guardar la solicitud, intente de nuevo.</p>
          )}
          {!!savingRequest && <p>Guardando su solicitud...</p>}
          <Button type="submit">Enviar solicitud</Button>
        </form>
      </StyledMain>
    </>
  );
}
