import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './Routers/AppRouter';
import configureStore from './Store/configureStore';
import { addExpense } from './Actions/expenses';
import { setTextFilter } from './Actions/filters';
import getVisibleExpenses from './Selectors/expenses';
import 'normalize.css/normalize.css';
import './Styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

store.dispatch(addExpense({description: 'Water bill', amount: 30000}));
store.dispatch(addExpense({description: 'Gas bill', amount: 15000}));
store.dispatch(setTextFilter('water'));

setTimeout(() => {
  store.dispatch(setTextFilter('bill'));
}, 3000);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
