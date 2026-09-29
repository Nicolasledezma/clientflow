const express = require("express");

const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getClients);

router.get("/:id", authMiddleware, getClientById);

router.post("/", authMiddleware, createClient);

router.put("/:id", authMiddleware, updateClient);

router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;