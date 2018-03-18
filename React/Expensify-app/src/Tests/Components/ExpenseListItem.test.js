import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../Components/ExpenseListItem';
import expenses from '../Fixtures/expenses';

test('Should render ExpenseListItem with an expense.', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[1]}/>);
  expect(wrapper).toMatchSnapshot();
});