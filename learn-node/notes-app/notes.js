const fs = require('fs');
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = title => {
    if (title.length === 0) {
        throw new Error('Title cannot be an empty string!')
    }

    const notes = loadNotes()
    const remainingNotes = notes.filter(note => note.title !== title)

    if (remainingNotes.length === notes.length) {
        console.log(chalk.red.inverse(`Note '${title}' not found.`))
    } else {
        saveNotes(remainingNotes)
        console.log(chalk.green.inverse(`Note '${title}' was removed!`))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJsON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    console.log(chalk.blue.inverse('Your notes:'))
    
    const notes = loadNotes()
    notes.forEach(note => console.log(note.title))
}

const readNote = title => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title)

    if (!!noteToRead) {
        console.log(chalk.green.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse(`'${title}' was not found...`))
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}