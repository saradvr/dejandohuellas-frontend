import { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/userReducer';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorPwd, setErrorPwd] = useState(null);
  const [userType, setUserTYpe] = useState('');

  const dispatch = useDispatch();

  const { error, loading } = useSelector(({ userReducer }) => ({
    error: userReducer.error,
    loading: userReducer.loading,
  }));

  function handleSubmit(e) {
    e.preventDefault();
    setErrorPwd(null);
    if (password.length < 6) {
      setErrorPwd('La contraseña debe tener al menos 6 caracteres.');
    } else {
      if (password === confirmPass) {
        dispatch(createUser(name, email.toLowerCase(), password, userType));
      } else {
        setErrorPwd('Las contraseñas no coinciden.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre</label>
      <Input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={true}
      />
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
      <label htmlFor="confirmPass">Confirme su contraseña</label>
      <Input
        type="password"
        name="confirmPass"
        id="confirmPass"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        required={true}
      />
      <label htmlFor="userType">Tipo de usuario</label>
      <select
        name="userType"
        id="userType"
        onChange={(e) => setUserTYpe(e.target.value)}
        required={true}
      >
        <option value="">Selecciona una opción</option>
        <option value="ONG">Fundación</option>
        <option value="Persona">Persona</option>
      </select>
      {!!errorPwd && <p>{errorPwd}</p>}
      {!!error && <p>{error}</p>}
      {!!loading && <p>{loading}</p>}
      <Button type="submit">Registrarme</Button>
    </form>
  );
}
