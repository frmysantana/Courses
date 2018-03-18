import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../Components/ExpenseForm';
import expenses from '../Fixtures/expenses';

test('Should render ExepnseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm with expense data.', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', ()=> {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('Should set note on textarea change', () => {
  const value = 'New note value';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('Should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('Should not set amount if input is invalid', () => {
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
});

// test('Should call onSubmit prop for valild form submission', () => {
//   const onSubmitSpy = jest.fn();
//   onSubmitSpy('Andrew', 'Philadelphia');
//   expect(onSubmitSpy).toHaveBeenCalledWih();
// });