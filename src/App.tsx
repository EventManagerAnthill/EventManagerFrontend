import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { SignIn } from './features/signIn/SignIn';

function App() {
  return (
    <Switch>
      <Route path="/">
        <SignIn />
      </Route>
    </Switch>
  );
}

export default App;
