// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 2048;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));


app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))