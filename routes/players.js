const express = require("express");

const router = express.Router();

const playerController = require("../controllers/players");

router.get("/", playerController.getMainPage);

router.post("/add-player", playerController.addPlayer);

router.get("/players", playerController.getPlayers);

router.post("/player-search", playerController.playerSearch);

module.exports = router;
