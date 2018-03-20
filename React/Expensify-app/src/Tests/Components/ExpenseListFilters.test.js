import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../Components/ExpenseListFilters';
import { filters, altFilters } from '../Fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, 
  setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('Should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
  const value = 'Some text';
  wrapper.find('input').prop('onChange')({ target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Should sort by date', () => {
  const value = 'Date';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(sortByDate).toHaveBeenCalled();
});

test('Should sort by amount', () => {
  const value = 'Amount';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(sortByAmount).toHaveBeenCalled();
});

test('Should handle date changes', () => {
  const dateChange = {
    startDate: altFilters.startDate,
    endDate:  altFilters.endDate
  };
  wrapper.find('DateRangePicker').prop('onDatesChange')(dateChange);
  expect(setStartDate).toHaveBeenLastCalledWith(dateChange.startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(dateChange.endDate);
});

test('Should handle date focus changes', () => {
  const calenderFocused = 'startDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);
  expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
});