const fs = require(`fs`);
const util = require(`util`);

//fs read file
const readFromFile = util.promisify(fs.readFile);

//fs write to file
const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
err ? console.error(err) : console.info(`\nData written to ${destination}`)
);
//read and append
const readAndAppend = (content, file) => {
    fs.readFile(file, `utf8`, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    })
}
//delete a note
const deleteNote = (id, file) => {
    fs.readFile(file, `utf8`, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            for (let i=0; i < parsedData.length; i++) {
                if (parsedData[i].id == id) {
                    parsedData.splice(i, 1);
                }
            }
            writeToFile(file, parsedData);
        }
    })
}
module.exports = {readFromFile, writeToFile, readAndAppend, deleteNote};