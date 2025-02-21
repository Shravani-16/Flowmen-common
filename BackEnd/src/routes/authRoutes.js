import express from 'express';
import { register, login, logout } from '../controllers/authController.js'; // Adjust the path as needed
import {verifyJWT} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(verifyJWT, logout);

export default router;
