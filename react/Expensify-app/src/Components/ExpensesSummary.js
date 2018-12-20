import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../Selectors/expenses';
import selectExpensesTotal from '../Selectors/expenses-total';

export const ExpensesSummary = ({ expensesLength, expensesTotal }) => {
  const expenseWord = expensesLength === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00');

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{expensesLength}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span>.</h1>
        <div className="page-header__actions">
          <Link className="button" to='/create'>Add Expense</Link>
        </div>
      </div>
    </div>
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