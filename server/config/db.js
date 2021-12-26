const mongoose = require("mongoose");

const database = {};
database.connect = async () => {
 mongoose
  .connect(process.env.DB_USER_PATH, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
}


module.exports = database;
