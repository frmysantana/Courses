// Filters reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'Date',
  startDate: undefined,
  endDate: undefined
};
  
export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'Amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'Date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.start
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.end
      }
    default:
      return state;
    }
};