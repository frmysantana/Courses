// very similar to Redux, useReducer is for managing more complex state and abstracting the logic outside of the componenet itself to keep it clean and re-usable

const notesReducer = ( state, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
        return [
            ...state, 
            action.note
        ]
        case 'REMOVE_NOTE':
        return state.filter(note => note.title !== action.title)
        case 'POPULATE_NOTES':
        return action.notes
        default:
        return state
    }
}

export { notesReducer as default }