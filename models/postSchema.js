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

const postSchema= new mongoose.Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
    },
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    },
  createdAt: {
    type: Date,
    default: Date.now
    },
  });

  const posts = new mongoose.model("posts", postSchema);

module.exports = posts;