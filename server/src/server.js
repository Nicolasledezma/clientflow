const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const dealRoutes = require("./routes/dealRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ClientFlow API is running",
    status: "success",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ClientFlow backend is healthy",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes); 
app.use("/api/deals", dealRoutes);

app.listen(PORT, () => {
  console.log(`ClientFlow API running on http://localhost:${PORT}`);
});