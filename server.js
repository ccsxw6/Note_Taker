// sets up server
const express = require("express");
// provides a way of working with directories and file paths.
const path = require("path");
// works with files on system; eg read, create, update files
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));


let notes_data = [];

// routes

// When api/notes is visited, read db.json file, add it to notes_data array, send notes_data to response
app.get("/api/notes", function (err, res) {
  notes_data = fs.readFileSync("Develop/db/db.json", "utf8");
  notes_data = JSON.parse(notes_data);

  if (err) {
    console.log(err);
  }
  res.json(notes_data);
});


// When there's a post request, read db.json, 
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



app.listen(PORT, function () {
  console.log("SERVER IS LISTENING: " + PORT);
});