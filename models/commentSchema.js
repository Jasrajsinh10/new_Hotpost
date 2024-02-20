const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017");
const Schema = mongoose.Schema;

connect
  .then(() => {
  console.log("Connection Succcesful")
})
  .catch(() => {
    console.log("Connection Unsuccesfull")
  })