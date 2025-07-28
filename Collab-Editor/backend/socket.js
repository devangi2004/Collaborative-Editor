const { Server } = require("socket.io");
const Document = require("./models/Document");
function socketHandler(server) {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("join", ({ docId, user }) => {
      socket.join(docId);
      socket.to(docId).emit("presence", user);

      socket.on("edit", ({ content }) => {
        socket.to(docId).emit("update", content);
      });

      socket.on("disconnect", () => {
        socket.to(docId).emit("leave", user);
      });
    });
  });
}
module.exports = socketHandler;