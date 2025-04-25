const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note);

    await fs.writeFile('./db.json', JSON.stringify(notes))
    console.log(chalk.green.inverse('note was added successfully'))
}
async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: 'utf8' });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes () {
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is the list of notes'))
    notes.forEach(note => {
        console.log(chalk.yellow(note.id, note.title))
    })
}

async function removeNote(noteId) {
    const notes = await getNotes()

    const filtered = notes.filter(note => note.id !== noteId)
    await fs.writeFile(notesPath, JSON.stringify(filtered))
    console.log(chalk.blue('removed title'))
}

module.exports = {
    addNote, printNotes, removeNote
}