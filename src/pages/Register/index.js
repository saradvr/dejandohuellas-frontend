import { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/userReducer';
import { Header } from '../../components/Header';
import { useHistory } from 'react-router';
import { FormLabel } from '../../components/FormLabel';
import { FormSelect } from '../../components/FormSelect';
import { ImgSection, RegisterMain, StyledForm, StyledTitle } from './styles';
import { LoadingPawPrints } from '../../components/LoadingPawPrints';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorPwd, setErrorPwd] = useState(null);
  const [userType, setUserTYpe] = useState('');

  const history = useHistory();
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

  const token = localStorage.getItem('token');
  if (token) {
    history.push('/');
  }

  return (
    <>
      <Header />
      <RegisterMain justify="center" height="auto">
        <ImgSection>
          <StyledTitle>¡Regístrate!</StyledTitle>
          <StyledForm onSubmit={handleSubmit}>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <FormLabel htmlFor="email">Correo</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <FormLabel htmlFor="confirmPass">Confirme su contraseña</FormLabel>
            <Input
              type="password"
              name="confirmPass"
              id="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required={true}
            />
            <FormLabel htmlFor="userType">Tipo de usuario</FormLabel>
            <FormSelect
              name="userType"
              id="userType"
              onChange={(e) => setUserTYpe(e.target.value)}
              required={true}
            >
              <option value="">Selecciona una opción</option>
              <option value="ONG">Fundación</option>
              <option value="Persona">Persona</option>
            </FormSelect>
            {!!errorPwd && <p>{errorPwd}</p>}
            {!!error && <p>{error}</p>}
            {!!loading && <LoadingPawPrints show={loading} />}
            <Button type="submit">Registrarme</Button>
          </StyledForm>
        </ImgSection>
      </RegisterMain>
    </>
  );
}
