const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv-flow").config({path: "./config/"});
require("./config/db");
const app = express();
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const {checkUser, requireAuth} = require("./middleware/auth.middleware");
const cors = require("cors");

const corsOptions = {origin: process.env.CLIENT_URL,credentials: true};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.all("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
    return res.status(200).send(res.locals.user._id);
});
//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

//required to run tests

function stop() {
    server.close();
}

module.exports = server;
module.exports.stop = stop;
