const express = require("express");
const path = require("path");
const fs = require("fs");

let noteArr = [];

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req, res) {
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
      if(err) throw err;
      else {
        noteArr = JSON.parse(data);
        res.json(noteArr);
      }
    })
  });

app.post("/api/notes", (req, res) => {
  const noteNew = req.body;
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    noteArr = JSON.parse(data);
    noteArr.push(noteNew);
    const noteString = JSON.stringify(noteArr);
    fs.writeFile(__dirname + "/db/db.json", noteString, (err) => {
      if (err) throw err;
    });
    res.json(noteArr);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  noteArr = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));
  // console.log(noteArr);
  noteArrSplice = noteArr.splice(parseInt(id), 1);
  // console.log(noteArrSplice);
  const stringNoteID = JSON.stringify(noteArr);
  // console.log(stringNoteID);
  fs.writeFile("./db/db.json", stringNoteID, (err) => {
    if (err) throw err;
  });
  res.json(noteArr);
});

// HTML routes for the server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// If no matching route is found default to home
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
  });

