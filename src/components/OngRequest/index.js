import { useDispatch } from 'react-redux';
import { deleteRequest } from '../../store/adoptionReducer';
import { Button } from '../Button';
import { FormSelect } from '../FormSelect';
import { PetImage, StyledArticle } from './styles';

export function OngRequest({ request }) {
  const { animal, person, status, message, _id } = request;
  const dispatch = useDispatch();
  function changeStatus(e) {
    console.log(e.target.value);
  }
  return(
    <StyledArticle>
      <PetImage src={animal.profilePicture} alt="Foto animal" />
      <p>{animal.name}</p>
      <div>
        <p>{person.user.name}</p>
        <p>{person.phone}</p>
        <p>{person.user.email}</p>
      </div>
      <div>
        <p>{message}</p>
      </div>
      <div>
        <FormSelect name="status" id="status" defaultValue={status} onChange={changeStatus}>
          <option value="Nuevo">Nuevo</option>
          <option value="Revisión solicitud">Revisión solicitud</option>
          <option value="Entrevista agendada">Entrevista agendada</option>
          <option value="Revisión entrevista">Revisión entrevista</option>
          <option value="Aprobada">Aprobada</option>
          <option value="Rechazado">Rechazado</option>
          <option value="Retiro" disabled>Retiro</option>
        </FormSelect>
      </div>
      {/* <Button
        type="button"
        onClick={e => dispatch(deleteRequest(_id, () => console.log('Se eliminó')))}
      >
        Eliminar Solicitud
      </Button> */}
    </StyledArticle>
  );
}
