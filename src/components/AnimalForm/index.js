import { Button } from '../Button';
import { useState } from 'react';
import { Input } from '../Input';
import { useDispatch, useSelector } from 'react-redux';
import { createAnimal, updateAnimal } from '../../store/animalReducer';
import { FormLabel } from '../FormLabel';
import { FormSelect } from '../FormSelect';
import { StyledTextArea } from '../FormTextArea';
import {
  LeftSection,
  TwoSectionForm,
  RightSection,
  ImgPreviewSection,
  ImgPreview,
} from './styles';

export function AnimalForm({ update, animalId }) {
  const { animal } = useSelector(({ animalReducer }) => ({
    animal: animalReducer.animal,
  }));
  const [name, setName] = useState(!!update ? animal.name : '');
  const [animalType, setType] = useState(!!update ? animal.animalType : '');
  const [age, setAge] = useState(!!update ? animal.age : '');
  const [sex, setSex] = useState(!!update ? animal.sex : '');
  const [rescueHistory, setHistory] = useState(!!update ? animal.history : '');
  const [size, setSize] = useState(!!update ? animal.size : '');
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setPreview] = useState(
    !!update ? animal.profilePicture : ''
  );
  const [city, setCity] = useState(!!update ? animal.city : '');
  const [errorFile, setErrorFile] = useState('');
  const [errorValidacion, setErrorValidacion] = useState('');
  const dispatch = useDispatch();

  const { error, saving } = useSelector(({ animalReducer }) => ({
    error: animalReducer.error,
    saving: animalReducer.saving,
  }));

  function readFile(file) {
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      setErrorValidacion('');
    } catch (error) {
      setErrorValidacion('Error para leer la imagen.');
    }

    reader.onload = (e) => setPreview(e.target.result);

    reader.onerror = (e) => setErrorFile(reader.error);
  }

  function handleChange(e) {
    readFile(e.target.files[0]);
    setProfilePicture(e.target.files);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (age <= 0) {
      setErrorValidacion('Ingrese una edad válida');
      return false;
    }
    const data = new FormData();
    data.append('name', name);
    data.append('animalType', animalType);
    data.append('age', age);
    data.append('sex', sex);
    data.append('history', rescueHistory);
    data.append('size', size);
    data.append('city', city);
    if (profilePicture) {
      data.append('profilePicture', profilePicture[0], profilePicture[0].name);
    }
    if (update === false) {
      dispatch(createAnimal(data));
    } else {
      dispatch(updateAnimal(data, animalId));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TwoSectionForm>
        <LeftSection>
          <FormLabel htmlFor="name">Nombre:</FormLabel>
          <Input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required={true}
          />
          <FormLabel htmlFor="animalType">Tipo de peludo:</FormLabel>
          <FormSelect
            name="animalType"
            id="animalType"
            onChange={(e) => setType(e.target.value)}
            required={true}
            defaultValue={animalType}
          >
            <option value="">Selecciona una opción</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </FormSelect>
          <FormLabel htmlFor="age">Edad (meses):</FormLabel>
          <Input
            type="number"
            name="age"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required={true}
          />
          <FormLabel htmlFor="sex">Sexo:</FormLabel>
          <FormSelect
            name="sex"
            id="sex"
            onChange={(e) => setSex(e.target.value)}
            required={true}
            defaultValue={sex}
          >
            <option value="">Seleccione una opción</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </FormSelect>
          <FormLabel htmlFor="size">Tamaño:</FormLabel>
          <FormSelect
            name="size"
            id="size"
            onChange={(e) => setSize(e.target.value)}
            required={true}
            defaultValue={size}
          >
            <option value="">Selecciona una opción:</option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </FormSelect>
          <FormLabel htmlFor="city">Ciudad:</FormLabel>
          <FormSelect
            name="city"
            id="city"
            onChange={(e) => setCity(e.target.value)}
            required={true}
            defaultValue={city}
          >
            <option value="">Seleccione una opción</option>
            <option value="Medellín">Medellín</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Cali">Cali</option>
            <option value="Cartagena">Cartagena</option>
          </FormSelect>
        </LeftSection>
        <RightSection>
          <FormLabel htmlFor="rescueHistory">Historia:</FormLabel>
          <StyledTextArea
            id="rescueHistory"
            name="rescueHistory"
            value={rescueHistory}
            onChange={(e) => setHistory(e.target.value)}
            required={true}
            placeholder="Cuéntale a todos un poco de la historia de este peludo."
          />
          <FormLabel htmlFor="profilePicture">Foto de perfil:</FormLabel>
          <ImgPreviewSection>
            <Input
              type="file"
              accept="image/*"
              name="profilePicture"
              id="profilePicture"
              onChange={handleChange}
              required={!update ? true : false}
            />
            {!!imagePreview && (
              <ImgPreview
                src={imagePreview}
                alt="Vista previa de foto de perfil"
              />
            )}
          </ImgPreviewSection>
        </RightSection>
      </TwoSectionForm>
      {!!errorValidacion && <p>{errorValidacion}</p>}
      <Button type="submit">
        {!!update ? 'Actualizar información' : 'Guardar peludo'}
      </Button>
      {!!errorFile && (
        <p>Hubo un error al cargar la imagen, intente de nuevo.</p>
      )}
      {!!error && (
        <p>Hubo un error al guardar la información, intente de nuevo.</p>
      )}
      {!!saving && <p>Se está guardando la información</p>}
    </form>
  );
}
