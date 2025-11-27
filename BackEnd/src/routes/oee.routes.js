import { Router } from 'express';
import {
  getOeeData,
  getOeeSummary,
  createOeeData,
} from '../controllers/oee.controller.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';

const router = Router();

// Secured routes for OEE data
router.route("/data").get(verifyJWT, getOeeData).post(verifyJWT, createOeeData);
router.route("/summary").get(verifyJWT, getOeeSummary);

export default router;
