import selectExpenses from '../../Selectors/expenses';
import moment from 'moment';
import expenses from '../Fixtures/expenses';

test('Should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'Date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

test('Should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'Date',
    startDate: moment(0),
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test('Should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'Date',
    startDate: undefined,
    endDate: moment(0)
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test('Should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'Date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('Should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'Amount',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});