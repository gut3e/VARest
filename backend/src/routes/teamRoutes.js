const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.post("/", teamController.criar);
router.get("/", teamController.listar);

module.exports = router;