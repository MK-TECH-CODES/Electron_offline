const { app, BrowserWindow, ipcMain } = require("electron/main");
const net = require("net");
const path = require("path");
let client;

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  // Setup TCP client
  client = new net.Socket();

  client.connect(12345, "127.0.0.1", () => {
    console.log("Connected to TCP server");
  });

  client.on("data", (data) => {
    console.log("Server:", data.toString());
    win.webContents.send("tcp-receive", data.toString());
  });

  client.on("close", () => console.log("TCP connection closed"));
  client.on("error", (err) => console.error("TCP error:", err));
}

// Receive message from renderer and send to TCP server
ipcMain.on("tcp-send", (event, message) => {
  if (client) {
    client.write(message);
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
