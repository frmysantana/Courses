import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../Components/EditExpensePage';
import expenses from '../Fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage 
      editExpense={editExpense} 
      removeExpense={removeExpense} 
      history={history} 
      expense={expenses[2]}
    />
  );
});

test('Should render EditExpensesPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should handle editExpenses.', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('Should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});
