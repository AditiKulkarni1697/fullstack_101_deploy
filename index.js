const express = require("express");
const { connection } = require("./main");
const { userRouter } = require("./routes/users.roues");
const { noteRouter } = require("./routes/note.routes");
const { recordLogger } = require("./Middlewares/recordRouter");
const { validation } = require("./Middlewares/validation");
const jwt = require("jsonwebtoken");
const { auth } = require("./Middlewares/authenticate");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.use(auth);

app.use("/notes", noteRouter);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("err.message");
  }

  console.log(`Server running at port ${process.env.port}`);
});
