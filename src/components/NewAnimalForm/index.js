import { Button } from '../Button';
import { useState } from 'react';
import { Input } from '../Input';
import { useDispatch } from 'react-redux';
import { createAnimal, HIDE_MODAL } from '../../store/animalReducer';

export function NewAnimalForm() {
  const [name, setName] = useState('');
  const [animalType, setType] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [rescueHistory, setHistory] = useState('');
  const [size, setSize] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setPreview] = useState(null);
  const [city, setCity] = useState('');
  const [errorFile, setErrorFile] = useState('');
  const dispatch = useDispatch();

  function readFile(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => setPreview(e.target.result);

    reader.onerror = (e) => setErrorFile(reader.error);
  }

  function handleChange(e) {
    readFile(e.target.files[0]);
    setProfilePicture(e.target.files);
  }

  function handleSubmit(e) {
    e.preventDefault();
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
    dispatch(createAnimal(data));
    dispatch({ type: HIDE_MODAL });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <Input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required={true}
      />
      <label htmlFor="animalType">Tipo de peludo:</label>
      <select
        name="animalType"
        id="animalType"
        onChange={(e) => setType(e.target.value)}
        required={true}
      >
        <option value="">Selecciona una opción</option>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
      </select>
      <label htmlFor="age">Edad (meses):</label>
      <Input
        type="number"
        name="age"
        id="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required={true}
      />
      <label htmlFor="sex">Sexo:</label>
      <select
        name="sex"
        id="sex"
        onChange={(e) => setSex(e.target.value)}
        required={true}
      >
        <option value="">Seleccione una opción</option>
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
      </select>
      <label htmlFor="size">Tamaño:</label>
      <select
        name="size"
        id="size"
        onChange={(e) => setSize(e.target.value)}
        required={true}
      >
        <option value="">Selecciona una opción:</option>
        <option value="Pequeño">Pequeño</option>
        <option value="Mediano">Mediano</option>
        <option value="Grande">Grande</option>
      </select>
      <label htmlFor="city">Ciudad:</label>
      <select
        name="city"
        id="city"
        onChange={(e) => setCity(e.target.value)}
        required={true}
      >
        <option value="">Seleccione una opción</option>
        <option value="Medellín">Medellín</option>
        <option value="Bogotá">Bogotá</option>
        <option value="Cali">Cali</option>
        <option value="Cartagena">Cartagena</option>
      </select>
      <label htmlFor="rescueHistory">Historia:</label>
      <textarea
        id="rescueHistory"
        name="rescueHistory"
        value={rescueHistory}
        onChange={(e) => setHistory(e.target.value)}
        required={true}
        placeholder="Cuéntale a todos un poco de la historia de este peludo."
      />
      <label htmlFor="profilePicture">Foto de perfil:</label>
      <Input
        type="file"
        accept="image/*"
        name="profilePicture"
        id="profilePicture"
        onChange={handleChange}
        required={true}
      />
      {!!imagePreview && (
        <img
          width="10%"
          src={imagePreview}
          alt="Vista previa de foto de perfil"
        />
      )}
      <Button type="submit">Guardar peludo</Button>
      {!!errorFile && (
        <p>Hubo un error al cargar la imagen, intente de nuevo.</p>
      )}
    </form>
  );
}
