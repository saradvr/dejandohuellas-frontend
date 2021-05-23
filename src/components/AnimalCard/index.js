import { LinkButton } from '../LinkButton';
import { AnimalGreetH2, PetImage, StyledArticle } from './styles';

export function AnimalCard({ animal, edit }) {
  const { profilePicture, name, age, _id, sex } = animal;
  let time = age === 1 ? 'mes' : 'meses';
  let ageYears = age;
  if (age >= 12) {
    ageYears = Math.ceil(age / 12);
    time = ageYears === 1 ? 'año' : 'años';
  }
  return (
    <StyledArticle>
      <PetImage src={profilePicture} alt="Foto de perfil del animal" />
      <AnimalGreetH2>¡Hola, soy {name}!</AnimalGreetH2>
      <p>
        Tengo{' '}
        <strong>
          {ageYears} {time}
        </strong>{' '}
        y estoy {sex === 'Macho' ? 'listo' : 'lista'} para dejar huella en tu
        hogar.
      </p>
      <LinkButton to={!!edit ? `/peludo/${_id}/edit` : `/peludo/${_id}`}>
        ¡Conoce más sobre mí!
      </LinkButton>
    </StyledArticle>
  );
}
