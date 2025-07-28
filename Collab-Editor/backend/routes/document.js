const express = require("express");
const Document = require("../models/Document");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const docs = await Document.find({ owner: req.user.id });
  res.json(docs);
});

router.post("/", verifyToken, async (req, res) => {
  const doc = await Document.create({ ...req.body, owner: req.user.id });
  res.json(doc);
});

router.get("/:id", verifyToken, async (req, res) => {
  const doc = await Document.findById(req.params.id);
  res.json(doc);
});

router.put("/:id", verifyToken, async (req, res) => {
  const doc = await Document.findById(req.params.id);
  doc.content = req.body.content;
  doc.versions.push({ content: req.body.content, timestamp: new Date() });
  await doc.save();
  res.json(doc);
});

module.exports = router;