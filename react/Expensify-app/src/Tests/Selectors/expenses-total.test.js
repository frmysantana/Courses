import selectExpensesTotal from '../../Selectors/expenses-total';
import expenses from '../Fixtures/expenses';

test('Should return 0 if no expenses are passed in', () => {
  const result = selectExpensesTotal();
  expect(result).toBe(0);
}) ;

test('Should correctly add up a single expense', () => {
  const result = selectExpensesTotal([expenses[0]]);
  expect(result).toBe(expenses[0].amount);
});

test('Should correctly add up multiple expenses', () => {
  let total = 0;
  for(let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  
  const result = selectExpensesTotal(expenses);
  expect(result).toBe(total);
})