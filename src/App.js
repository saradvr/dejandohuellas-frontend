import './App.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { history } from './utils/history';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/registro">
          <Register />
        </Route>
        <Route exact path='/entrar'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
