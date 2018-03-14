import React from 'react';
import ReactDOM from 'react-dom';
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

store.dispatch(addExpense({
  description: 'Water bill',
  amount: 10000
}));

store.dispatch(addExpense({
    description: 'Gas bill',
    amount: 15000
}));

store.dispatch(setTextFilter('water'));

ReactDOM.render(<AppRouter />, document.getElementById('app'));
