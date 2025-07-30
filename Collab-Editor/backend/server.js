io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
  });

  socket.on("save-document", async data => {
    await Document.findByIdAndUpdate(documentId, { data });
  });

  socket.on("send-changes", delta => {
    socket.broadcast.to(documentId).emit("receive-changes", delta);
  });
});