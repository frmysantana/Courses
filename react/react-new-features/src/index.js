import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import notesReducer from './reducers/notes'
import Note from './components/Note'

const NoteApp = () => {
  const [ notes, dispatch ] = useReducer(notesReducer, [])
  const [ title, setTitle ] = useState('')
  const [ body, setBody ] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    dispatch({type: 'ADD_NOTE', note: {title, body}})
    setTitle('')
    setBody('')
  }

  const removeNote = ({title}) => {
    dispatch({ type: 'REMOVE_NOTE', title })
  }

  useEffect(() => {
    let notes = localStorage.getItem('notes') ? 
      JSON.parse(localStorage.getItem('notes')) :
      []

    dispatch({ type: 'POPULATE_NOTES', notes })
  }, [])

  useEffect(() => {
    const updatedNotes = JSON.stringify(notes)
    localStorage.setItem('notes', updatedNotes)
  }, [ notes ])

  return (
    <div>
      <h1>Notes</h1>

      {notes.map(note => ( 
        <Note key={note.title} note={note} removeNote={removeNote}/>
      ))}

      <p>Add Notes</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>Add Note</button>
      </form>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
