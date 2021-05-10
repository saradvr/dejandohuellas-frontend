import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  HeaderButton,
  HeaderLink,
  LogoSection,
  MainNav,
  NavSection,
} from './styles';

export function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  function logout() {
    dispatch({ type: 'USER_LOGOUT' });
    localStorage.clear();
    history.push('/entrar');
  }
  const token = localStorage.getItem('token');

  return (
    <MainNav>
      <LogoSection>
        <img
          src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/9393.png"
          alt="Logo Dejando Huellas"
          width="10%"
        />
      </LogoSection>
      <NavSection>
        <HeaderLink to="/">Inicio</HeaderLink>
        {!token && <HeaderLink to="/entrar">Iniciar sesión</HeaderLink>}
        {!token && <HeaderLink to="/registro">Regristrarme</HeaderLink>}
        {token && <HeaderLink to="/profile">Mi perfil</HeaderLink>}
        {<HeaderLink to="/adopta">¡Adopta!</HeaderLink>}
        {token && (
          <HeaderButton type="button" onClick={logout}>
            Cerrar sesión
          </HeaderButton>
        )}
      </NavSection>
    </MainNav>
  );
}
