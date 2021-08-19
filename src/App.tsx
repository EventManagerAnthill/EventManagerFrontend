import React from 'react';
import './App.scss';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { SignIn } from './features/signIn/SignIn';
import { useAppDispatch, useAppSelector } from './app/state/store';
import { selectRouterRedirectTo } from './features/routerSlice';
import { routerReset } from '../src/features/routerSlice';


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