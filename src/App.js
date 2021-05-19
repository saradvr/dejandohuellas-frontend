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
import { TransactionResult } from './pages/TransactionResult';
import { OngTransactions } from './pages/OngTransactions';
import { AdoptionRequest } from './pages/AdoptionRequest';
import { PersonRequests } from './pages/PersonRequests';
import { OngRequests } from './pages/OngRequests';

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
      render={({ location }) => {
        return !!token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/entrar',
              state: { from: location },
            }}
          />
        );
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
        <PrivateONGRoute exact path="/perfil">
          <UserProfile />
        </PrivateONGRoute>
        <Route exact path="/ong/:ongId">
          <OngProfile isPublic={true} />
        </Route>
        <Route exact path="/peludo/:animalId/">
          <AnimalProfile edit={false} />
        </Route>
        <PrivateONGRoute exact path="/peludo/:animalId/edit">
          <AnimalProfile edit={true} />
        </PrivateONGRoute>
        <Route exact path="/transaction-result">
          <TransactionResult />
        </Route>
        <PrivateONGRoute exact path="/transactions">
          <OngTransactions />
        </PrivateONGRoute>
        <PrivateRoute exact path="/peludo/:animalId/adopt">
          <AdoptionRequest />
        </PrivateRoute>
        <PrivateRoute exact path="/solicitudes">
          <PersonRequests />
        </PrivateRoute>
        <PrivateONGRoute exact path="/requests">
          <OngRequests />
        </PrivateONGRoute>
      </Switch>
    </Router>
  );
}

export default App;
