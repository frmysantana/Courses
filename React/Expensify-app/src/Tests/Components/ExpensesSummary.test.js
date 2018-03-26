import React from 'react';
import { ExpensesSummary } from '../../Components/ExpensesSummary';
import { shallow } from 'enzyme';
import expenses from '../Fixtures/expenses';
import { filters } from '../Fixtures/filters';

test('Should render one expense summary correctly', () => {
  const wrapper = shallow(<ExpensesSummary expensesLength={1} expensesTotal={1200}/>);
  expect(wrapper).toMatchSnapshot();
})

test('Should render with the count and total of multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expensesLength={14} expensesTotal={1600000} />);
  expect(wrapper).toMatchSnapshot();
});