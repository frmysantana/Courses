import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../Components/Header';

test('Should render header correctly.', () => {
  const wrapper = shallow(<Header startLogout={()=>{}}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should call startLogout on button click.', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});

