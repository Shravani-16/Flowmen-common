import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';

const router = Router();

// Admin-only routes for user management
router.route('/').get(verifyJWT, getAllUsers);
router.route('/:id').get(verifyJWT, getUserById).patch(verifyJWT, updateUserRole).delete(verifyJWT, deleteUser);

export default router;
