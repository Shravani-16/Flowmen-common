const express = require('express');
const { postData, finalData } = require('../controllers/dataController');

const router = express.Router();

router.post('/postData', postData);
router.get('/getFinaldata', finalData);

module.exports = router;
