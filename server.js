const express = require("express");
const path = require("path");
const fs = require("fs");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if(err) throw err;
      else {
        let notesSave = JSON.parse(data);
        res.send(notesSave);
      }
    })
  });

app.post("/api/notes", (req, res) => {
  const noteNew = req.body;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    const noteArray = JSON.parse(data);
    noteArray.push(noteNew);
    noteArray.forEach((note, i) => {
      note.id = i +1
    });
    const noteString = JSON.stringify(noteArray);
    fs.writeFile("./db/db.json", noteString, "utf8", (err) => {
      if (err) throw err;
    });
    res.json(noteArray);
  });
  
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

