const express = require('express');
const { ingestReading, queryReadings, getIdeals, getTableView } = require('../controllers/soilController.js');
const router = express.Router();

router.post('/data', ingestReading);
router.get('/data', queryReadings);
router.get('/ideals', getIdeals);
router.get('/table', getTableView);

module.exports = router;
