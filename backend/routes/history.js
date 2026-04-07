const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const authMiddleware = require('../middleware/authMiddleware');

// Get user's analysis history - PROTECTED ROUTE
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch all analysis for this user, sorted by newest first
    const history = await Analysis.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      message: 'History retrieved',
      count: history.length,
      history,
    });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
});

// Get single analysis by ID - PROTECTED ROUTE
router.get('/history/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const analysisId = req.params.id;

    const analysis = await Analysis.findOne({ _id: analysisId, userId });

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    res.json({
      message: 'Analysis retrieved',
      analysis,
    });
  } catch (error) {
    console.error('Analysis fetch error:', error);
    res.status(500).json({ message: 'Error fetching analysis', error: error.message });
  }
});

// Delete analysis - PROTECTED ROUTE
router.delete('/history/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const analysisId = req.params.id;

    const analysis = await Analysis.findOneAndDelete({ _id: analysisId, userId });

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    res.json({ message: 'Analysis deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting analysis', error: error.message });
  }
});

module.exports = router;
