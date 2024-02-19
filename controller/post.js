const users = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const e = require('express');
const posts = require('../models/postSchema');

exports.getpostcreate = (req, res) => {
  const user = req.session.user;
  // console.log(user);
  res.render("postcreate" , {user});
}
exports.gethome = async (req, res) => {
  let postall = await posts.find();
  const user = req.session.user;
  if (user.username !== undefined) {
    res.render("home", { postall, user });
  }
  else {
    res.redirect("/login")
  }
}
exports.postpostcreate = async (req, res) => {
  const user = req.session.user;
  const post = {
    username: user.username,
    userid: user._id,
    content: req.body.content
  };
  console.log(post)
  if (user.username !== undefined) {
    const userpost = await posts.insertMany(post);
    console.log(userpost);
    res.redirect("/home");
  }
  else {
    res.redirect("/login");
  }
}

exports.getMyposts = async (req, res) => {
  const user = req.session.user;
  let postall = await posts.find();
  res.render("Myposts", { postall , user});
}



