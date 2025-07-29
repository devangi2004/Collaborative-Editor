io.on('connection', socket => {
  socket.on('get-document', async (docId) => {
    const document = await findOrCreateDocument(docId);
    socket.join(docId);
    socket.emit('load-document', document.data); // This must send data back
  });

  socket.on('save-document', async (data) => {
    await Document.findByIdAndUpdate(docId, { data });
  });

  socket.on('send-changes', delta => {
    socket.broadcast.to(docId).emit('receive-changes', delta);
  });

  socket.on('cursor-change', range => {
    socket.broadcast.to(docId).emit('cursor-update', {
      userId: socket.id,
      range
    });
  });
});
async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: '' });
}