import { login, logout } from '../../Actions/auth';

test('Should generate login action object.', () => {
  const action = login('abc123');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'abc123'
  });
});

test('Should generate logout action object.', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});