const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(
  express.static(path.join(__dirname), {
    maxAge: "1d",
    etag: false,
  })
);

// Route for disclaimer page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "desclaimer.html"));
});

app.get("/disclaimer", (req, res) => {
  res.sendFile(path.join(__dirname, "desclaimer.html"));
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// 404 handler - serve disclaimer page
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "desclaimer.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).sendFile(path.join(__dirname, "desclaimer.html"));
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
