const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.post("/", playerController.criar);
router.get("/", playerController.listar);
router.put("/:id", playerController.atualizarPlayer);
router.delete("/:id", playerController.excluirPlayer);

module.exports = router;