// server.js
const net = require("net");

const server = net.createServer((socket) => {
  console.log(
    "Client connected:",
    socket.remoteAddress + ":" + socket.remotePort
  );

  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());
    socket.write("Hello from Node.js server!");
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`TCP server listening on port ${PORT}`);
});
