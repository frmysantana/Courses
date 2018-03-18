import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../Components/ExpenseList';
import expenses from '../Fixtures/expenses';

test('Should render ExpenseList with expenses.', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseList with empy message.', () => {
  const wrapper = shallow(<ExpenseList expenses={[]}/>);
  expect(wrapper).toMatchSnapshot();
});