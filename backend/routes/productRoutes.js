const express = require("express");
const router = express.Router();

const supabase = require("../supabase");

// Test product route
router.get("/", (req, res) => {
    res.send("Product API is working!");
});

module.exports = router;