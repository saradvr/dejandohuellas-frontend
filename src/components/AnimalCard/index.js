import { Link } from 'react-router-dom';

export function AnimalCard({ animal }) {
  const { profilePicture, name, age, _id, sex } = animal;
  let time = age === 1 ? 'mes' : 'meses';
  let ageYears = age;
  if (age > 12) {
    ageYears = Math.ceil(age / 12);
    time = ageYears === 1 ? 'año' : 'años';
  }
  return (
    <article>
      <img src={profilePicture} alt="Foto de perfil del animal" />
      <h2>¡Hola, soy {name}!</h2>
      <p>
        Tengo {ageYears} {time} y estoy {sex === 'Macho' ? 'listo' : 'lista'}{' '}
        para dejar huella en tu hogar.
      </p>
      <Link to={`/peludo/${_id}`}>¡Conoce más sobre mí!</Link>
    </article>
  );
}
