const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const userSchema = require("../New_Hotpost/models/userSchema");
const postSchema = require("../New_Hotpost/models/postSchema");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const port = 8000;
const posts = require('../New_Hotpost/models/postSchema');
const users = require('../New_Hotpost/models/userSchema');

const methodOverride = require("method-override");

app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.listen(port, () => {
  console.log("server is working fine");
});


app.use(
  session({
    secret: "123456789123456",
    resave: false,
    saveUninitialized: false,
  })
);


const authRoutes = require("./router/auth");
const postRoutes = require("./router/post");
app.use(authRoutes);
app.use(postRoutes);

app.get("/edit/:_id", async(req, res) => {
  let post = await posts.findById(req.params._id);
  // console.log(post);
  res.render("edit" , {post});
})

app.patch("/edit/:_id", async (req, res) => {
  console.log(req.body.content);
  let newpost = await posts.updateOne({ _id: req.params._id }, { content: req.body.content });
  // console.log(newpost);
  res.redirect("/home");
})


app.delete("/delete/:_id", async (req, res) => {
  let deletepost = await posts.deleteOne({ _id: req.params._id });
  res.redirect("/home");
})

app.patch("/editusername/:_id", async (req, res) => {
  const user = req.session.user;

  let newusername = await users.updateOne({ _id: user._id }, { username: req.body.username })

  
  let newpostusername = await posts.updateMany({userid : user._id}, {username : req.body.username})
  req.session.user.username = req.body.username; 

  res.redirect("/home");
})