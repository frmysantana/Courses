import { createStore, combineReducers } from 'redux';

const demoState = {
    expenses: [{
        id: 'apoiuzfnstnqspoih',
        description: 'January rent',
        note: 'This was the final payment for that address',
        ammount: 54500, // In pennies to reduce rounding/computation errors  
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'ammount', // date or ammount
        startDate: undefined,
        endDate: undefined 
    }
};
