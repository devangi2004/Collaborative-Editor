const mongoose = require("mongoose");
const DocumentSchema = new mongoose.Schema({
  title: String,
  content: String,
  versions: [{ content: String, timestamp: Date }],
  sharedWith: [String],
  owner: String,
}, { timestamps: true });
module.exports = mongoose.model("Document", DocumentSchema);