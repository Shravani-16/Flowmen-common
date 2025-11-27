const express = require('express');
const { getMembers } = require('../controllers/member.controller');

const router = express.Router();

router.get('/data', getMembers);

module.exports = router;
