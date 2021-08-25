import React from 'react';
import './App.scss';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { SignIn } from './features/signIn/SignIn';
import { useAppDispatch, useAppSelector } from './app/state/store';
import { selectRouterRedirectTo } from './features/routerSlice';
import { routerReset } from '../src/features/routerSlice';
import { Welcome } from './pages/welcome/Welcome';
import { SignUp } from './features/signUp/SignUp';
import { Identify } from './features/identify/Identify';
import { ResetPassword } from './features/resetPassword/ResetPassword';


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
      <Route path="/identify">
        <Identify />
      </Route>
      <Route path="/resetpassword">
        <ResetPassword />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/">
        <Welcome />
      </Route>
    </Switch>
  );
}

export default App;