import React from 'react';
import './App.scss';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { SignIn } from './features/signIn/SignIn';
import { useAppDispatch, useAppSelector } from './app/state/store';
import { selectRouterRedirectTo } from './features/routerSlice';
import { routerReset } from '../src/features/routerSlice';
import { Home } from './pages/home/Home';
import { SignUp } from './features/signUp/SignUp';


const App = () => {
  const location = useLocation();
  const history = useHistory();
  const redirectTo = useAppSelector(selectRouterRedirectTo);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (redirectTo && location.pathname !== redirectTo) {
      history.push(redirectTo);
      dispatch(routerReset());
    }
  });

  return (
    <Switch>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;