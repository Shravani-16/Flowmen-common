const express = require('express');
const { 
    cycleTime, 
    downTime, 
    macAvail, 
    macOEE, 
    macPerf, 
    proQual, 
    totalProductionReport 
} = require('../calculations/calculations');

const router = express.Router();

router.get('/getMachineAvailabilty', macAvail);
router.get('/getMachinePerformance', macPerf);
router.get('/getProductionQuality', proQual);
router.get('/getMachineOEE', macOEE);
router.get('/getCycleTime', cycleTime);
router.get('/getDownTime', downTime);
router.get('/getTotalProductionReport', totalProductionReport);

module.exports = router;
