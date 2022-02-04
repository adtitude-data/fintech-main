/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React , {useState} from 'react';
import { Switch, Route , Redirect  } from 'react-router-dom';
import { createBrowserHistory as createHistory } from "history";
import PrivateRoute from "./private.route";

import axios from 'axios';
import 'assets/css/avatars.css'; // import all styles
import 'assets/css/style.css'; // import all styles
import 'assets/css/media.css'; // import all styles
import AppContainer from 'components/Partials/AppContainer';
import HomePage from 'containers/HomePage/Loadable';
import AuthLoginPage from 'containers/AuthLoginPage/Loadable';
import AuthForgetPasswordPage from 'containers/AuthForgetPasswordPage/Loadable';
import AdminAgentsPage from 'containers/AdminAgentsPage/Loadable';
import AdminClientsPage from 'containers/AdminClientsPage/Loadable';

import AgentClientsPage from 'containers/AgentClientsPage/Loadable';
import AgentAccountsPage from 'containers/AgentAccountsPage/Loadable';

import ClientAccountsPage from 'containers/ClientAccountsPage/Loadable';
import TwoFaPage from 'containers/TwoFaPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import ContactUs from 'containers/ContactUs/Loadable';
import PrivacyPolicy from 'containers/PrivacyPolicy/Loadable';

const history = createHistory();
const apiUrl = process.env.SERVER;

import GlobalStyle from '../../global-styles';

export default function App() {
  const [token, setToken] = useState();

  return (
    <div>


        <Switch>
          {/* Auth Pages */}
          <Route exact path="/" component={AuthLoginPage} />
          <Route exact path="/login" component={AuthLoginPage} />
          <Route exact path="/forget-password" component={AuthForgetPasswordPage} />
          <Route exact path="/2fa-verification" component={TwoFaPage} />

          {/* App Admin Pages */}
          <PrivateRoute exact userRole="Admin" path="/admin/agents" component={AdminAgentsPage} />
          <PrivateRoute exact userRole="Admin" path="/admin/clients" component={AdminClientsPage} />

          {/* App Admin Pages */}
          <PrivateRoute exact userRole="Agent" path="/agent/clients" component={AgentClientsPage} />
          <PrivateRoute exact userRole="Agent" path="/agent/clients/:id" component={AgentAccountsPage} />
          <PrivateRoute exact userRole="Agent" path="/agent/accounts" component={AgentAccountsPage} />

          {/* Static Pages */}
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />

          {/* Unkown Route 404 */}
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      <GlobalStyle />
    </div>
  );
}
