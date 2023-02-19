const express = require("express");

const validation = (req, res, next) => {
  if (req.method == "POST" && req.url == "/createuser") {
    const { name, email, pass, age } = req.body;
    if (
      (typeof name == "string",
      typeof email == "string",
      typeof pass == "string",
      typeof age == "string")
    ) {
      next();
    } else {
      res.send("Validation failed");
    }
  } else {
    next();
  }
};

module.exports = { validation };
