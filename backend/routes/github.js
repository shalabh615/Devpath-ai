const express = require('express');
const router = express.Router();
const { analyzeGitHub, saveGitHub } = require('../controllers/githubController');
const { protect } = require('../middleware/auth');

router.post('/analyze', analyzeGitHub);           // public
router.post('/save', protect, saveGitHub);        // private (save to user profile)

module.exports = router;
