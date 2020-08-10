import React, { useState, useEffect, useReducer } from 'react'
import notesReducer from '../reducers/notes'
import NoteList from './NoteList'
import AddNoteForm from './AddNoteForm'
import NotesContext from '../context/notes-context'

const NoteApp = () => {
    // very similar to Redux, useReducer hook is for managing more complex state and abstracting the logic outside of the componenet itself to keep it clean and re-usable

    const [notes, dispatch] = useReducer(notesReducer, [])

    useEffect(() => {
        let notes = localStorage.getItem('notes') ?
            JSON.parse(localStorage.getItem('notes')) :
            []

        dispatch({ type: 'POPULATE_NOTES', notes })
    }, [])

    useEffect(() => {
        const updatedNotes = JSON.stringify(notes)
        localStorage.setItem('notes', updatedNotes)
    }, [notes])

    return (
        <NotesContext.Provider value={{ notes, dispatch }}>
            <h1>Notes</h1>
            <NoteList />
            <AddNoteForm />
        </NotesContext.Provider>
    )
}

export { NoteApp as default }