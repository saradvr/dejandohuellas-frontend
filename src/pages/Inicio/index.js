import { Header } from '../../components/Header';
import { LinkButton } from '../../components/LinkButton';
import { DescriptionDiv, InicioMain, MainSection, TitleH1 } from './styles';

export function Inicio() {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  return (
    <>
      <Header />
      <InicioMain>
        <TitleH1>Dejando Huellas</TitleH1>
        <MainSection>
          <div>
            <DescriptionDiv>
              <p>
                Somos una fundación sin ánimo de lucro que busca acoger animales
                en situaciones desfavorables para cuidarlos y brindarles unas
                mejores condiciones mientras buscamos un hogar permanente para
                nuestros peludos.
              </p>
            </DescriptionDiv>
            {!token ? (
              <LinkButton to={`/ong/${process.env.REACT_APP_ONG}`}>
                ¡Conoce más!
              </LinkButton>
            ) : userType === 'ONG' ? (
              <LinkButton to="/perfil">Ver mi perfil</LinkButton>
            ) : (
              <LinkButton to="/solicitudes">Ver mis solicitudes</LinkButton>
            )}
          </div>
        </MainSection>
      </InicioMain>
    </>
  );
}
