import { Router } from 'express';
import {
  getSoilData,
  getIdealSoilData,
  createSoilData,
} from '../controllers/soil.controller.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';

const router = Router();
console.log("SOIL ROUTES LOADED");

// Secured routes for soil data
router.route("/data").get(verifyJWT, getSoilData).post(verifyJWT, createSoilData);
router.route("/ideals").get(verifyJWT, getIdealSoilData);

export default router;
