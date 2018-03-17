import { addExpense, editExpense, removeExpense } from '../../Actions/expenses';

test('Should set up removeExpense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('Should set up editExpense action object', () => {
  const action = editExpense('156ef', {note: 'New note value.'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '156ef',
    updates: {
      note: 'New note value.'
    }
  });
});

test('Should set up addExpense action object with provided values.', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last month\'s rent.'
  }

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('Should set up addExpense action object with default values.', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      amount: 0,
      createdAt: 0,
      note: '',
      id: expect.any(String)
    }
  })
});