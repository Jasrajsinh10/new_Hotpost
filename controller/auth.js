const users = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const e = require('express');
const posts = require('../models/postSchema');
const session = require("express-session");


exports.getlogin = (req, res) => {
  res.render("login", {
    isAuthenticated: req.session.isLoggedIn,
  });
}

exports.getsignup = (req, res) => {
  res.render("signup", {
    isAuthenticated: false,
    
  });
}

exports.postsignup = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }
  const checkuser = await users.findOne({ username: user.username });
  if (checkuser) {
    // req.flash('error', 'Username alredy exsists');
    return res.redirect("/signup");
  }
  else {
    const checkemail = await users.findOne({ email: user.email });
    if (checkemail) {
      return res.redirect("/signup")
    }
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashpassword;
  }
  console.log(user);
  const userdata = await users.insertMany(user);
  res.redirect("/login");
}

exports.postlogin = async (req, res) => {
  let userAll = await users.find();
  // console.log(userAll)
  userAll.forEach(u => {
    if (u.username == req.body.name) {
      user = u;
      // console.log(user)
    }
  });
  req.session.user = user;
  res.redirect("/home")
}

exports.logout = async (req, res) => {
  req.session.user = undefined;
  res.redirect("/login");
}


  
