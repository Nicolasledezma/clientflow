const express = require("express");

const {
  getDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getDeals);

router.get("/:id", authMiddleware, getDealById);

router.post("/", authMiddleware, createDeal);

router.put("/:id", authMiddleware, updateDeal);

router.delete("/:id", authMiddleware, deleteDeal);

module.exports = router;