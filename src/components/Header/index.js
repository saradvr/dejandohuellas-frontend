import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

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
    <nav>
      <Link to="/">Inicio</Link>
      {!token && <Link to="/entrar">Iniciar sesión</Link>}
      {!token && <Link to="/registro">Regristrarme</Link>}
      {token && <Link to="/profile">Mi perfil</Link>}
      {<Link to="/adopta">¡Adopta!</Link>}
      {token && (
        <Button type="button" onClick={logout}>
          Cerrar sesión
        </Button>
      )}
    </nav>
  );
}
