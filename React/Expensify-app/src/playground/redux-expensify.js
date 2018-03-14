import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';  //(universally unique identifier)

// ADD_EXPENSE
const addExpense = ({
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(), // uses UUID (universally unique identifier)
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates)=> ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
const setStartDate = ( start ) => ({
  type: 'SET_START_DATE',
  start
});

// SET_END_DATE
const setEndDate = ( end ) => ({
  type: 'SET_END_DATE',
  end
});

// Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // concat doesn't change state itself; it just returns the result of 
      // concatenating state with action.expense
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':  
      // filter also doesn't change the state itself.
      return state.filter((expense) => {
        return expense.id !== action.id;
      });
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
          ...expense,
          ...action.updates
          }
        } else {
          return expense
        }
      });
    default:
      return state;
  }
};

// Filters reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'Date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'Amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'Date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.start
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.end
      }
    default:
      return state;
  }
};

// timestamp (milliseconds after starting point)
// starting point for all timestamps: January 1, 1970 (unix epoch)
// 33400 (i.e. 33.4 seconds after Unix epoch), 10, -203 (i.e. 203 ms BEFORE unix epoch)

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'Date') {
      return a.createdAt < b.createdAt ? 1 : -1; 
    } else if (sortBy === 'Amount') {
      return b.amount - a.amount;
    }
  });
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// Dispatching an action returns that action object, so it can be stored in a 
// variable for later use
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 })); 
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -100 }));

// // Using the previously caught action object to get the id of the expense to 
// // remove it from the state contatiner
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('ee'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-20000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(20000));

// const demoState = {
//     expenses: [{
//         id: 'apoiuzfnstnqspoih',
//         description: 'January rent',
//         note: 'This was the final payment for that address',
//         amount: 54500, // In pennies to reduce rounding/computation errors  
//         createdAt: 0
//     }],
//     filters: {
//         text: 'rent',
//         sortBy: 'amount', // date or amount
//         startDate: undefined,
//         endDate: undefined 
//     }
// };


// Object Spread Operator example
// const user = {
//   name: 'Jen',
//   age: 24
// };

// console.log({
//   age: 27,
//   ...user,
//   location: 'Philadelphia',
// });