// sets up server
const express = require("express");
// provides a way of working with directories and file paths.
const path = require("path");
// works with files on system; eg read, create, update files
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));


// empty array to hold notes data
let notes_data = [];

// routes - defined in index.js

// GET Route to /api/notes 
app.get("/api/notes", function (err, res) {
  // setting notes_data to the contents of this file
  notes_data = fs.readFileSync("Develop/db/db.json", "utf8");
  // parsing db.json file to json 
  notes_data = JSON.parse(notes_data);
  if (err) {
    console.log(err);
  }
  res.json(notes_data);
});


// Post route to /api/notes
// stores user's information in the db.json file
app.post("/api/notes", function (req, res) {
  notes_data = fs.readFileSync("./Develop/db/db.json", "utf8");
  notes_data = JSON.parse(notes_data);
  req.body.id = notes_data.length;
  notes_data.push(req.body);
  notes_data = JSON.stringify(notes_data);

  fs.writeFile("./Develop/db/db.json", notes_data, "utf8", function (err) {
    if (err) throw err;
  });
  res.json(JSON.parse(notes_data));
  if (err) throw err;
  console.error(err);
});


app.delete("/api/notes/:id", function (req, res) {
  notes_data = fs.readFileSync("./Develop/db/db.json", "utf8");
  notes_data = JSON.parse(notes_data);
  notes_data = notes_data.filter(function(note) {
    return note.id != req.params.id;
  });
  notes_data = JSON.stringify(notes_data);
  fs.writeFile("./Develop/db/db.json", notes_data, "utf8", function (err) {
    if (err) throw err;
  });
  res.send(JSON.parse(notes_data));
  if (err) throw err;
});

// HTML GET Requests
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
});

// listening for express server
app.listen(PORT, function () {
  console.log("SERVER IS LISTENING: " + PORT);
});