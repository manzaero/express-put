const yargs = require("yargs");
const {addNote, printNotes, removeNote} = require('./notes.controller')

const pkg = require('./package.json');

yargs.command({
    command: 'add',
    describe: 'add new note to list',
    builder: {
        title: {
            type: 'string',
            describe: 'The title of the note',
            demandOption: true,
        }
    },
    handler({title}){
        addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'print all notes',
    async handler(){
        printNotes()
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove note',
    builder:{
        id: {
            type: 'string',
            describe: 'id of the note',
            demandOption: true,
        }
    },
    async handler({id}){
        await removeNote(id)
    }
})


yargs.parse()