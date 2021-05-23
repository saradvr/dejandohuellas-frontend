import { Button } from '../Button';
import { FormLabel } from '../FormLabel';
import {
  AnimalNameH2,
  ArticleLink,
  PetImage,
  StatusP,
  StyledArticle,
} from './styles';

export function OngRequest({ request }) {
  const { animal, status, _id } = request;
  return (
    <ArticleLink to={(location) => `${location.pathname}/${_id}`}>
      <StyledArticle>
        <AnimalNameH2>{animal.name}</AnimalNameH2>
        <PetImage src={animal.profilePicture} alt="Foto animal" />
        <FormLabel>Estado:</FormLabel>
        <StatusP>{status}</StatusP>
        <Button type="button">Ver detalles</Button>
      </StyledArticle>
    </ArticleLink>
  );
}
