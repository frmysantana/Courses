import expensesReducer from '../../Reducers/expenses';
import expenses from '../Fixtures/expenses';

test('Should set default state.', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('Should remove expense by id.', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expenses if id not found.', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should add an expense.', () => {
  const expense = {
    id: '4',
    description: 'Super Meat Boy',
    amount: '800',
    note: 'Tough platforming game.',
    createdAt: 10000000
  };
  const action = { 
    type: 'ADD_EXPENSE',
    expense  
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses.concat(expense));
});

test('Should edit an expense.', () => {
  const updates = {note: 'Last month\'s rent.'};
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].note).toBe(updates.note);
});

test('Should not edit expense if expense not found', () => {
  const updates = {note: 'Last month\'s rent.'};
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'i',
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("Should set expenses", () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});