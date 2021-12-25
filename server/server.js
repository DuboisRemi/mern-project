const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv-flow").config({ path: "./config/" });
require("./config/db");
const app = express();
const passport = require("passport");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
var https = require('https');
const fs = require('fs');
var privateKey  = fs.readFileSync('config/privkey.pem', 'utf8');
var certificate = fs.readFileSync('config/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const cors = require("cors");

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

let port = process.env.PORT || 5000;
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);

//required to run tests

function stop() {
  httpsServer.close();
}

module.exports = httpsServer;
module.exports.stop = stop;
