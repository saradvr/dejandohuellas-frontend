import './App.css';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { history } from './utils/history';
import { Inicio } from './pages/Inicio';
import { OngProfile } from './pages/OngProfile';
import { UserProfile } from './components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimalProfile } from './pages/AnimalProfile';
import { createGlobalStyle } from 'styled-components';
import SnowyNight from './components/Tipografia/Snowy-Night.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Snowy Night';
    src: url(${SnowyNight}) format('truetype');
    font-style: normal;
    font-display: auto;
  }

  p {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 400;
  }
`;

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to="/entrar" />;
      }}
    />
  );
}

function PrivateONGRoute({ children, ...rest }) {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  return (
    <Route
      {...rest}
      render={() => {
        return token && userType === 'ONG' ? children : <Redirect to="/" />;
      }}
    />
  );
}

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route exact path="/registro">
          <Register />
        </Route>
        <Route exact path="/entrar">
          <Login />
        </Route>
        <PrivateRoute exact path="/perfil">
          <UserProfile />
        </PrivateRoute>
        <Route exact path="/ong/:ongId">
          <OngProfile isPublic={true} />
        </Route>
        <Route exact path="/peludo/:animalId/">
          <AnimalProfile edit={false} />
        </Route>
        <PrivateONGRoute exact path="/peludo/:animalId/edit">
          <AnimalProfile edit={true} />
        </PrivateONGRoute>
      </Switch>
    </Router>
  );
}

export default App;
