const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv-flow").config({ path: "./config/" });
const database = require("./config/db");
const app = express();
const passport = require("passport");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const fs = require('fs');
const cors = require("cors");
const https = require("https");
const privateKey  = fs.readFileSync('config/privkey.pem', 'utf8');
const certificate = fs.readFileSync('config/cert.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
const db = Promise.resolve(database.connect());

let port = process.env.PORT || 5000;
const server = https.createServer(credentials, app).listen(port);

//required to run tests

function stop() {
  server.close();
}

module.exports = server;
module.exports.stop = stop;

