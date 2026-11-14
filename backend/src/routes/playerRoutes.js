const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.post("/", playerController.criar);
router.get("/", playerController.listar);

module.exports = router;