const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/UserModel");
const { recordLogger } = require("../Middlewares/recordRouter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const { reset } = require("nodemon");

userRouter.get("/", async (req, res) => {
  try {
    const database = await UserModel.find();
    res.send(database);
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.post("/createuser", async (req, res) => {
  const { name, email, pass, age } = req.body;
  try {
    bcrypt.hash(pass, 8, async (err, hash) => {
      if (err) {
        res.send(err.message);
      } else {
        const user = new UserModel({ name, email, pass: hash, age });
        await user.save();
        res.send("user added");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.patch("/updateuser/:id", recordLogger, async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    const query = await UserModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send("user updated");
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.post("/login", async (req, res) => {
  // login
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length != 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai", {
            expiresIn: 60 * 60,
          });
          res.send({ msg: "Log in successful", token: token });
        } else {
          res.send(err);
        }
      });
    } else {
      res.send({ msg: " wrong credentials" });
    }
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.get("/data", async (req, res) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  // async - await

  const decoded = await jwt.verify(token, "masai");

  if (!decoded) {
    res.send("Something went wrong please login again.");
  } else {
    console.log(decoded);
    const database = await UserModel.find();
    res.send(database);
  }
  // jwt.verify(token, "masai", async(err,decoded)=>{
  //     console.log(decoded)
  //     if(decoded){
  //         const database = await UserModel.find()
  //         res.send(database)

  //     }
  //     else{
  //         res.send({"msg":err.message})
  //         console.log(err.message)
  //     }

  // })
});

module.exports = { userRouter };
