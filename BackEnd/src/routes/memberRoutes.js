import express from 'express'
import { getMembers } from '../controllers/member.controller.js';

const router = express.Router();

router.get('/data', getMembers)

export default router;