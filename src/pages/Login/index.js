import { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/userReducer';
import { Header } from '../../components/Header';
import { useHistory } from 'react-router';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const { error, loading } = useSelector(({ userReducer }) => ({
    error: userReducer.error,
    loading: userReducer.loading,
  }));

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(email.toLowerCase(), password));
  }

  const token = localStorage.getItem('token');
  if (token) {
    history.push('/');
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo</label>
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <label htmlFor="password">Contraseña</label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        {!!error && <p>{error}</p>}
        {!!loading && <p>{loading}</p>}
        <Button type="submit">Iniciar Sesión</Button>
      </form>
    </>
  );
}
