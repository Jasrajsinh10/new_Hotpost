const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017");

connect
  .then(() => {
  console.log("Connection Succcesful")
})
  .catch(() => {
    console.log("Connection Unsuccesfull")
  })

  const Loginschema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
  });

  const users = new mongoose.model("users", Loginschema);

module.exports = users;