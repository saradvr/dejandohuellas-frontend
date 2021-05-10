import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { HeaderButton, StyledNavBar } from './styles';

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
    <>
      <StyledNavBar collapseOnSelect expand="sm" sticky="top" variant="dark">
        <StyledNavBar.Brand href="/">
          <img
            src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/9393.png"
            alt="Logo Dejando Huellas"
            width="30px"
          />
        </StyledNavBar.Brand>
        <StyledNavBar.Toggle aria-controls="responsive-navbar-nav" />
        <StyledNavBar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/">Inicio</Nav.Link>
            {!token && <Nav.Link href="/entrar">Iniciar sesión</Nav.Link>}
            {!token && <Nav.Link href="/registro">Registrarme</Nav.Link>}
            {token && <Nav.Link href="/perfil">Mi perfil</Nav.Link>}
            <Nav.Link href="/adopta">¡Adopta!</Nav.Link>
            {token && (
              <HeaderButton
                type="button"
                onClick={logout}
                id="CerrarSesion"
                className="botonHeader"
              >
                Cerrar sesión
              </HeaderButton>
            )}
          </Nav>
        </StyledNavBar.Collapse>
      </StyledNavBar>
    </>
  );
}
