const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser')

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function(err, data) {
      if(err) throw err;
      if(data.length > 2) {
        let notesSave = JSON.parse(data);
        res.send(notesSave);
      }
      else {
        console.log("No notes.")
      }
    })
  });

app.post("/api/note", function(req, res) {
  
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

