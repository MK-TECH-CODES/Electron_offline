function sendMessage() {
  const message = document.getElementById("messageInput").value;
  window.electronAPI.sendToTCP(message);
  document.getElementById("messageInput").value = "";
}

// Listen for responses from main process
window.electronAPI.receiveFromTCP((data) => {
  const log = document.getElementById("log");
  log.textContent += `\nServer: ${data}`;
});
