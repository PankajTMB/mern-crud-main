require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();
const server = require("http").createServer(app);

// Connect to db
const db = require("./db");
db();

// Routes
app.use(cors());
app.use(express.json());
app.use("/api", require("./routes"));

server.listen(process.env.PORT || 5000);
