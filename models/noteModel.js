const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: String },
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };
