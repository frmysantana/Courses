// Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // concat doesn't change state itself; it just returns the result of 
      // concatenating state with action.expense
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':  
      // filter also doesn't change the state itself.
      return state.filter((expense) => {
        return expense.id !== action.id;
      });
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
          ...expense,
          ...action.updates
          }
        } else {
          return expense
        }
      });
    default:
      return state;
  }
};

export default expensesReducer;