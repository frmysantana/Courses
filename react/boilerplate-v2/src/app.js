import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './Styles/styles.scss';
import AppRouter, { history } from './Routers/AppRouter';
import configureStore from './Store/configureStore';
import { login, logout } from './Actions/auth';
import { firebase } from './Firebase/firebase';
import LoadingPage from './Components/LoadingPage';

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

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    // Load in user's expenses once they've logged in
    renderApp();
      // Only re-direct user to the dashboard if they were just on the login page
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    // send user back to the login page after they's logged out
    renderApp();
    history.push('/');
  }
});
