const express = require("express");
const Document = require("../models/Document");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const doc = new Document({ title: "Untitled", owner: req.user.id, content: {} });
  await doc.save();
  res.json(doc);
});

router.get("/", async (req, res) => {
  const docs = await Document.find({ owner: req.user.id });
  res.json(docs);
});

router.get("/:id", async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).send();
  res.json(doc);
});

router.put("/:id", async (req, res) => {
  const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

module.exports = router;