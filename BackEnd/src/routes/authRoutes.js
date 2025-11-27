const express = require('express');
const { register, login, logout } = require('../controllers/authController'); // Adjust the path as needed
const { verifyJWT } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(verifyJWT, logout);

module.exports = router;
