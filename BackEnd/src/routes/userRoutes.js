const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all users
router.get('/users', authMiddleware.verifyToken, userController.getAllUsers);

// Get a single user by ID
router.get('/user/:id', authMiddleware.verifyToken, userController.getUserById);

// Update user by ID
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);

// Delete user by ID
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser);

module.exports = router;
