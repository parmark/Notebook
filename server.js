// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 2048;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public", "notes.html")));

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db", "db.json")));

app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "db", "db.json"), function(err, data) {
        var json = JSON.parse(data)
        req.body["id"] = Math.floor(Math.random() * 100000000);
        json.push(req.body);
        fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(json), function(err) {
            if (err) console.log(err)
        })
    })

    res.json(req.body);
})

app.delete("/api/notes/:id", function(req, res) {
    fs.readFile(path.join(__dirname, "db", "db.json"), function(err, data) {
        var json = JSON.parse(data);
        for(i = 0; i < json.length; i++) {
            if (json[i].id === parseInt(req.params.id)) {
                json.splice(i, 1)
                fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(json), function(err) {
                    if (err) console.log(err)
                })
            }
        }
    })
    

    res.json(req.body)
})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));