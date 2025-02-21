import express from 'express'
import {postData, finalData } from "../controllers/dataController.js";

const router = express.Router();

router.post('/postData',postData)
router.get('/getFinaldata',finalData)

export default router;