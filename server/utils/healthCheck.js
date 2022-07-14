'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ "status": "ok" });
})

module.exports = router;