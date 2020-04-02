var express = require("express");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req, res) {
    res.json(tableData);
  });

app.post("/api/note", function(req, res) {
// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
// It will do this by sending out the value "true" have a table
// req.body is available since we're using the body parsing middleware
    
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

