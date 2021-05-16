import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createRequest } from '../../store/adoptionReducer';
import { getAnimal } from '../../store/animalReducer';
import { Button } from '../Button';
import { FormLabel } from '../FormLabel';
import { StyledTextArea } from '../FormTextArea';
import { Input } from '../Input';

export function AdoptionForm() {
  const [message, setMessage] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const { animalId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimal(animalId));
  }, [dispatch, animalId]);

  const { animal } = useSelector(({ animalReducer }) => ({
    animal: animalReducer.animal,
  }));

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createRequest(animalId, animal.ong._id, message));
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <FormLabel htmlFor="name">Nombre: </FormLabel>
      <Input
        type="text"
        id="name"
        name="name"
        required={true}
      />
      <FormLabel htmlFor="email">Correo: </FormLabel>
      <Input
        type="email"
        id="email"
        name="email"
        required={true}
      />
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
      /> */}
      <FormLabel htmlFor="message">
        Cuéntanos por qué deseas adoptar este peludo:
      </FormLabel>
      <StyledTextArea
        placeholder="Escribe un poco sobre ti..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">Enviar solicitud</Button>
    </form>
  );
}
