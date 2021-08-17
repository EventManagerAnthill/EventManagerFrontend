import React from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import { SignIn } from './features/signIn/SignIn';

function App() {
  return (
    <Switch>
      <Route path="/signIn">
        <SignIn />
      </Route>
      <Route path="/">
        <Link to='/signIn'> Sign in</Link>
      </Route>
    </Switch>
  );
}

export default App;
