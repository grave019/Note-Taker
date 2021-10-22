// Required files + modules
const router = require('express').Router();
const { readFromFile, readAndAppend, deleteNote } = require('../helper/fsUtils');
const uuid = require('../helper/uuid');


// GET route for retrieving all the notes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// POST route for submitting a new note
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    // If title and text was entered...
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        // Read JSON file and append new note
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error creating a new note');
    }
})

//DELETE request
router.delete('/notes/:id', (req, res) => {
    console.log(req.params.id);
    deleteNote(req.params.id, './db/db.json');
    res.json('success');
});

// Export
module.exports = router;