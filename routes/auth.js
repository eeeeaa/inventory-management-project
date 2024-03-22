const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");

//TODO
router.get("/", auth_controller.auth_get);

router.post("/", auth_controller.auth_post);

module.exports = router;
