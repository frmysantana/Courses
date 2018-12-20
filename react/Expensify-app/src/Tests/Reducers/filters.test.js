import filtersReducer from '../../Reducers/filters';
import moment from 'moment';
import filters from '../../Reducers/filters';

test('Should set up default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'Date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test("Should set sortBy to amount.", () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('Amount');
});

test('Should set sortBy to date.', () => {
  const currentState ={
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'Amount'
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('Date');
});

test('Should set text filter.', () => {
  const action = { 
    type: 'SET_TEXT_FILTER', 
    text: 'Rent'
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('Rent');
});

test('Should set start date filter.', () => {
  const start = moment();
  const action = {
    type: 'SET_START_DATE', 
    start
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(start);
});

test('Shourld set end date filter.', () => {
  const end = moment(0);
  const action = {
    type: 'SET_END_DATE',
    end
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(end);
});
