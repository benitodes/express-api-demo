const express = require('express');
const router = express.Router();

// Root
router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello'});
});

module.exports = router;