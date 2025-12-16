// src/routes/auth.routes.js
const router = require("express").Router();
const { register, login, me, logout } = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

module.exports = router;
