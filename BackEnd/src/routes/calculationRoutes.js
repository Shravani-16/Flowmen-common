import express from 'express'
import { cycleTime, downTime, macAvail, macOEE, macPerf, proQual, totalProductionReport } from '../calculations/calculations.js';

const router = express.Router();

router.get('/getMachineAvailabilty', macAvail)
router.get('/getMachinePerformance', macPerf)
router.get('/getProductionQuality', proQual)
router.get('/getMachineOEE', macOEE)
router.get('/getCycleTime', cycleTime)
router.get('/getDownTime', downTime)
router.get('/getTotalProductionReport', totalProductionReport)

export default router;