const express = require("express");
const cors = require("cors");
const documentRouter = require("./routes/documentRouter");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/main.html");
});

app.get("/public/index", (req, res) => {
    res.sendFile(__dirname + "/public/document.html");
});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use(express.json());

app.use("/api", documentRouter);

app.use(cors());

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
