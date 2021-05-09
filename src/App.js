import './App.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { history } from './utils/history';
import { Inicio } from './pages/Inicio';
import { OngProfile } from './pages/OngProfile';
import { UserProfile } from './components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router history={history}>
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
        <Route exact path="/profile">
          <UserProfile />
        </Route>
        <Route exact path="/ong/:ongId">
          <OngProfile isPublic={false} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
