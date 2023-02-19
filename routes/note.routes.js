const express = require("express");
const { NoteModel } = require("../models/noteModel");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    const userID = req.body;
    const notes = await NoteModel.find();
    res.send(notes);
  } catch (err) {
    res.send(err);
  }
});

noteRouter.post("/createnote", async (req, res) => {
  try {
    const payload = req.body;
    const note = new NoteModel(payload);
    await note.save();
    res.send({ msg: "note is created" });
  } catch (err) {
    res.send(err.message);
  }
});

noteRouter.patch("/patch/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    const payload = req.body;
    const note = await NoteModel.find({ _id: noteID });
    if (req.body.user === note[0].user) {
      await NoteModel.findByIdAndUpdate(noteID, payload);
      console.log("Updated");
    } else {
      console.log("Please log in");
      console.log(req.body.user, note[0].user);
      res.send("Please log in");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    const note = await NoteModel.find({ _id: noteID });
    if (req.body.user === note[0].user) {
      await NoteModel.findByIdAndDelete(noteID);
      console.log("Deleted");
    } else {
      console.log("Please log in");
      console.log(req.body.user, note[0].user);
      res.send("Please log in");
    }
    // console.log(`note with id:${noteID} deleted`);
    // res.send(`note with id:${noteID} deleted`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = { noteRouter };
