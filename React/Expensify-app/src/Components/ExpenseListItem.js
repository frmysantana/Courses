import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../Actions/expenses';

const ExpenseListItem = (props) => (
  <div>
    <h3>{props.description}</h3>
    <p>{props.amount} - {props.createdAt}</p>
    {console.log(props.id)}
    <button 
      onClick={(e)=>{props.dispatch(removeExpense({id: props.id}));}}
    >
      Remove
    </button>
  </div>
);

export default connect()(ExpenseListItem);