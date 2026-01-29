const express = require('express');
const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/culture", (req, res) => res.render("culture"));
router.get("/visualizer", (req, res) => res.render("visualizer"));
router.get("/study-buddy", (req, res) => res.render("study-buddy"));

module.exports = router;