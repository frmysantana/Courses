import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../Fixtures/expenses';
import database from '../../Firebase/firebase';
import { 
  startAddExpense, 
  addExpense, 
  editExpense,
  startEditExpense, 
  removeExpense, 
  startRemoveExpense, 
  setExpenses, 
  startSetExpenses 
} from '../../Actions/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });

  database.ref('expenses').set(expensesData).then(() => done());
});

test('Should set up removeExpense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('Should remove expense from firebase', (done) => {
  const store = createMockStore({});
  const id = 1;
  store.dispatch(startRemoveExpense({ id })).then(() => {
  database.ref(`expenses/${id}`).once('value').then((snapshot) => {
    const deletedExpense = snapshot.val();
    expect(deletedExpense).toBe(null);
    done();
  });
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

  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('Should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot)=> {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('Should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot)=> {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test('Should set up set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('Should update expense on firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  const updates = {
    note: 'Birthday gift for nephew'
  };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: '3',
      updates: {
        note: 'Birthday gift for nephew'
      }
    });

    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      description: expenses[2].description,
      amount: expenses[2].amount,
      createdAt: expenses[2].createdAt,
      ...updates
    });
    done();
  });
});
