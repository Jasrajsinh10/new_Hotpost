const users = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const e = require('express');
const posts = require('../models/postSchema');
const likes = require("../models/likesSchema");

exports.getpostcreate = (req, res) => {
  const user = req.session.user;
  // console.log(user);
  if (user == undefined) {
    res.redirect("/login")
  }
  else {
    res.render("postcreate", { user });
  }
}
exports.gethome = async (req, res) => {
  let postall = await posts.find();
  const user = req.session.user;
  if (user == undefined) {
    res.redirect("/login");
  }
  else {
    console.log
    res.render("home", { postall, user});
  }
}
exports.postpostcreate = async (req, res) => {
  const user = req.session.user;
  const post = {
    username: user.username,
    userid: user._id,
    content: req.body.content
  };
  if (user == undefined) {
    res.redirect("/login");
  }
  else {
    
    const userpost = await posts.insertMany(post);
    console.log(userpost);
    res.redirect("/home");
  }
}

exports.getMyposts = async (req, res) => {
  const user = req.session.user;
  if (user == undefined) {
    res.redirect("/login")
  }
  else {
    let postall = await posts.find();
    res.render("Myposts", { postall, user });
  }
}

exports.postlike = async (req, res) => {
  const user = req.session.user;
  let post = await posts.findById(req.params._id);
  
  if (post.like.includes(user._id)) {
    let newpostlike = post.like.pull(user._id);
    let deletelike = await posts.updateOne({ _id: req.params._id }, { like: newpostlike })
    res.redirect("/home")
  }
  else {
    post.like.push(user._id);
    let newpostlike = post.like;
    let newpost = await posts.updateOne({ _id: req.params._id }, { like: newpostlike });
    res.redirect("/home");
  }
  }

