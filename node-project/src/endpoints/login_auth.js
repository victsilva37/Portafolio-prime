const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => { // <- solo "/login"
  const { username, password } = req.body;
  if (username === process.env.API_USER && password === process.env.API_PASSWORD) {
    const user = { username };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});

module.exports = router;
