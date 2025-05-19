const net = require("net");
const readline = require("readline");

let clientSocket = null;

// Create readline interface to accept user input from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Server> ",
});

const server = net.createServer((socket) => {
  console.log("Client connected");
  clientSocket = socket;

  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());
    rl.prompt(); // Re-show prompt after receiving client data
  });

  socket.on("end", () => {
    console.log("Client disconnected");
    clientSocket = null;
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });

  rl.prompt();
});

// Listen for input from the server console
rl.on("line", (line) => {
  if (clientSocket) {
    clientSocket.write(line.trim());
  } else {
    console.log("No client connected.");
  }
  rl.prompt();
});

server.listen(12345, () => {
  console.log("TCP server listening on port 12345");
});
