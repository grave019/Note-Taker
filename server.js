//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

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