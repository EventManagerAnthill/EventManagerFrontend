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
import { PersonalSettings } from './pages/personalSettings/PersonalSettings';
import { getToken } from './useToken';
import { Header } from './components/authorized/header/Header';
import { LeftBar } from './features/leftBar/LeftBar';
import { selectLeftBarOpen } from './features/leftBar/leftBarSlice';
import { CompanyNew } from './components/authorized/company/companyNew/CompanyNew';
import { Company } from './components/authorized/company/company/Company';
import { EventForCompany } from './components/authorized/event/eventForCompany/EventForCompany';
import { CompanyEdit } from './components/authorized/company/companyEdit/CompanyEdit';
import { SnackbarComponent } from './features/snackbar/Snackbar';
import { CompanyList } from './components/authorized/company/companyList/CompanyList';
import { CompanyMembers } from './components/authorized/company/companyMembers/CompanyMembers';
import { EventNew } from './components/authorized/event/eventNew/EventNew';
import { EventComponent } from './components/authorized/event/event/Event';

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const redirectTo = useAppSelector(selectRouterRedirectTo);
  const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
  const dispatch = useAppDispatch();
  const token = getToken();

  React.useEffect(() => {
    if (redirectTo && location.pathname !== redirectTo) {
      history.push(redirectTo);
      dispatch(routerReset());
    }
  });

  if (!token) {
    return (
      <>
      <SnackbarComponent />
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
      </>
    )
  }

  return (
    <div>
      <SnackbarComponent />
      <Header />
      <div className="page">
        <LeftBar />
        <div className={isLeftBarOpen ? "mainWithLeftBar" : "main"}>
          <Switch>
            <Route path="/personalsettings">
              <PersonalSettings />
            </Route>
            <Route exact path="/company/:companyId/event/new" component={EventNew} />
            <Route exact path="/company/new" component={CompanyNew} />
            <Route exact path="/company/:companyId/edit" component={CompanyEdit} />
            <Route exact path="/company/:companyId/members" component={CompanyMembers} />
            <Route exact path="/company/list" component={CompanyList} />
            <Route path="/company/:companyId" component={Company} />
            <Route path="/event/:eventId" component={EventComponent} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;