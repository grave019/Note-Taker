//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("db.db.json")

const app = express();
const PORT = process.env.PORT || 3001;

//using express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// route that will sends user to index.html

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));

});

// route that will sends user to notes.html

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));

});

// Route that sends file to db/db.json

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));

});
//* should return to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    let newNote = req.body; 
    // generates a list of notes and saves it to a var by reading current db
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8")); 

    //creates unique ids using uuid, woo
    newNote.id = uuid();
    
    //pushes our new note onto that array read from the db
    noteList.push(newNote); 

    //write the updated data to db.json
    fs.writeFileSync(".db/db.json", JSON.stringify(noteList)); 
    res.json(noteList);

})