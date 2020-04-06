const fs = require("fs");

let noteArr = require("../db/db.json");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        fs.readFile("./db/db.json", (err, data) => {
          if(err) throw err;
          else {
            noteArr = JSON.parse(data);
            res.json(noteArr);
          }
        })
      });
    
    app.post("/api/notes", (req, res) => {
      const noteNew = req.body;
      fs.readFile("./db/db.json", (err, data) => {
        noteArr = JSON.parse(data);
        noteArr.push(noteNew);
        const noteString = JSON.stringify(noteArr);
        fs.writeFile("./db/db.json", noteString, (err) => {
          if (err) throw err;
        });
        res.json(noteArr);
      });
    });
    
    app.delete("/api/notes/:id", (req, res) => {
      const id = req.params.id;
      // console.log(id);
      noteArr = JSON.parse(fs.readFileSync("./db/db.json"));
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
    
}