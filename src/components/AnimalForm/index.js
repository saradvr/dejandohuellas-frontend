import { Button } from '../Button';
import { useState } from 'react';
import { Input } from '../Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAnimal,
  HIDE_MODAL,
  updateAnimal,
} from '../../store/animalReducer';

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
    if (update === false) {
      dispatch(createAnimal(data));
    } else {
      dispatch(updateAnimal(data, animalId));
    }
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
        <option value="Perro" selected={animalType === 'Perro' ? true : false}>
          Perro
        </option>
        <option value="Gato" selected={animalType === 'Gato' ? true : false}>
          Gato
        </option>
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
        <option value="Macho" selected={sex === 'Macho' ? true : false}>
          Macho
        </option>
        <option value="Hembra" selected={sex === 'Hembra' ? true : false}>
          Hembra
        </option>
      </select>
      <label htmlFor="size">Tamaño:</label>
      <select
        name="size"
        id="size"
        onChange={(e) => setSize(e.target.value)}
        required={true}
      >
        <option value="">Selecciona una opción:</option>
        <option value="Pequeño" selected={size === 'Pequeño' ? true : false}>
          Pequeño
        </option>
        <option value="Mediano" selected={size === 'Mediano' ? true : false}>
          Mediano
        </option>
        <option value="Grande" selected={size === 'Grande' ? true : false}>
          Grande
        </option>
      </select>
      <label htmlFor="city">Ciudad:</label>
      <select
        name="city"
        id="city"
        onChange={(e) => setCity(e.target.value)}
        required={true}
      >
        <option value="">Seleccione una opción</option>
        <option value="Medellín" selected={city === 'Medellín' ? true : false}>
          Medellín
        </option>
        <option value="Bogotá" selected={city === 'Bogotá' ? true : false}>
          Bogotá
        </option>
        <option value="Cali" selected={city === 'Cali' ? true : false}>
          Cali
        </option>
        <option
          value="Cartagena"
          selected={city === 'Cartagena' ? true : false}
        >
          Cartagena
        </option>
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
        required={!update ? true : false}
      />
      {!!imagePreview && (
        <img
          width="10%"
          src={imagePreview}
          alt="Vista previa de foto de perfil"
        />
      )}
      <Button type="submit">
        {!!update ? 'Actualizar información' : 'Guardar peludo'}
      </Button>
      {!!errorFile && (
        <p>Hubo un error al cargar la imagen, intente de nuevo.</p>
      )}
    </form>
  );
}
