import { createStore, combineReducers } from 'redux';
import expensesReducer from '../Reducers/expenses';
import filtersReducer from '../Reducers/filters';

export default () => {
  // Create Store

  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    })
  );

  return store;
}

