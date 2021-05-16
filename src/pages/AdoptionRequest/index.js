import { AdoptionForm } from '../../components/AdoptionForm';
import { Header } from '../../components/Header';
import { StyledMain } from '../../components/Main';

export function AdoptionRequest() {
  return (
    <>
      <Header />
      <StyledMain>
        <AdoptionForm />
      </StyledMain>
    </>
  );
}
