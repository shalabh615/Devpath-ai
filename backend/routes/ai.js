const express = require('express');
const router = express.Router();
const {
  generateRoadmap,
  getMyRoadmaps,
  getRoadmap,
  updateWeekStatus,
  deleteRoadmap
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

// All AI routes require authentication
router.use(protect);

router.post('/generate', generateRoadmap);
router.get('/roadmaps', getMyRoadmaps);
router.get('/roadmaps/:id', getRoadmap);
router.patch('/roadmaps/:id/week/:weekIndex', updateWeekStatus);
router.delete('/roadmaps/:id', deleteRoadmap);

module.exports = router;
