import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../Components/Header';
import HomePage from '../Components/HomePage';
import Portfolio from '../Components/Portfolio';
import Project from '../Components/Project';
import Contact from '../Components/Contact';
import NotFoundPage from '../Components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' component={HomePage} exact={true}/>
                <Route path='/portfolio' component={Portfolio} exact={true}/>
                <Route path='/portfolio/:id' component={Project} />
                <Route path='/contact' component={Contact} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
