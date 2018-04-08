import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './Routers/AppRouter';
import configureStore from './Store/configureStore';
import { startSetExpenses } from './Actions/expenses';
import { login, logout } from './Actions/auth';
import getVisibleExpenses from './Selectors/expenses';
import 'normalize.css/normalize.css';
import './Styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './Firebase/firebase';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// Make sure that the app is only rendered once
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    // Load in user's expenses once they've logged in
    store.dispatch(startSetExpenses()).then(()=> {
      renderApp();
      // Only re-direct user to the dashboard if they were just on the login page
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    // send user back to the login page after they's logged out
    renderApp();
    history.push('/');
  }
});
