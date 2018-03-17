import moment from 'moment';
import { 
  setTextFilter, 
  sortByAmount, 
  sortByDate, 
  setStartDate, 
  setEndDate 
} from '../../Actions/filters';

test('Should generate setStartDate action object', () => {
  const action = setStartDate(moment(0));

  expect(action).toEqual({
    type: 'SET_START_DATE',
    start: moment(0)
  });
});

test('Should generate setEndDate action object', () => {
  const action = setEndDate(moment(0));

  expect(action).toEqual({
    type: 'SET_END_DATE',
    end: moment(0)
  })
});

// Challenge tests (should be 4 total)

test('Should generate default setTextFilter.', () => {
  const action = setTextFilter();

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('Should generate setTextFilter from given string.', () => {
  const action = setTextFilter('a string.');

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'a string.'
  });
});

test('Should generate sortByDate action object.', () => {
  const action = sortByDate();

  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  });
});

test('Should generate sortByAmount action object.', () => {
  const action = sortByAmount();

  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});
