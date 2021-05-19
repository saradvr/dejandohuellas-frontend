import { ArticleLink, PetImage, StyledArticle } from './styles';

export function OngRequest({ request }) {
  const { animal, person, status, _id } = request;
  return (
    <ArticleLink to={(location) => `${location.pathname}/${_id}`}>
      <StyledArticle>
        <PetImage src={animal.profilePicture} alt="Foto animal" />
        <p>{animal.name}</p>
        <div>
          <p>{person.user.name}</p>
          <p>{person.phone}</p>
          <p>{person.user.email}</p>
          <p>{status}</p>
        </div>
      </StyledArticle>
    </ArticleLink>
  );
}
