import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../Actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    //Line below abstracts: props.dispatch(addExpense(expense));
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
          onSubmit={this.onSubmit}
        />
      </div>
    )
  };
}

// Used to abstract the above comment's dispatch call
const mapDispatchToProps = (dispatch) => {
  return {
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
  };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);