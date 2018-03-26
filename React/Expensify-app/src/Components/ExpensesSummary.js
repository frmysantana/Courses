import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../Selectors/expenses';
import selectExpensesTotal from '../Selectors/expenses-total';

export const ExpensesSummary = ({ expensesLength, expensesTotal }) => {
  return (
    <p>Viewing {
      expensesLength
      } {expensesLength === 1 ? 'expense' : 'expenses'} totalling {
      numeral(expensesTotal/100).format('$0,0.00')
      }.
    </p>
  );
};
 
const mapStateToProps = (state) => {
  const filteredExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expensesLength: filteredExpenses.length,
    expensesTotal: selectExpensesTotal(filteredExpenses)
  }
};

export default connect(mapStateToProps)(ExpensesSummary);