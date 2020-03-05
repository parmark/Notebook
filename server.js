// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 2048;

var notes

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public", "notes.html")));

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db", "db.json")))

app.post("/api/notes", function(req, res) {

    fs.readFile(path.join(__dirname, "db", "db.json"), function(err, data) {
        
        var json = JSON.parse(data);

        json.push(req.body);

        fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(json), function(err) {
            
            if (err) {
                console.log(err)
            }

            console.log("NEW NOTE LOGGED")
        })
    })

})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))