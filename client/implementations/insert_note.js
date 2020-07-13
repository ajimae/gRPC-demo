var client = require('../client')
let newNote = {
    title: "Note 3",
    content: "Content 3"
}

client.insert(newNote, (error, note) => {
    if (!error) {
        console.log('New Note created successfully', note)
    } else {
        console.error(error)
    }
})
