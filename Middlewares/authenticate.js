const express = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    console.log(token);
    jwt.verify(token, "masai", (err, decoded) => {
      console.log(decoded);
      if (decoded) {
        req.body.user = decoded.userID;
        next();
      } else {
        res.send({ msg: "please Login" });
      }
    });
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = { auth };
