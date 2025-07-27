const router = require("express").Router();
const Document = require("../models/Document");

router.get("/:id", async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (doc) return res.json(doc);
  res.status(404).json({ error: "Document not found" });
});

module.exports = router;
