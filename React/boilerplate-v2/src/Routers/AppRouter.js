import React from 'react';
import DashboardPage from '../Components/DashboardPage';
import NotFoundPage from '../Components/NotFoundPage';
import { Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../Components/LoginPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path='/' component={LoginPage} exact={true}/>
                <PrivateRoute path='/dashboard' component={DashboardPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
