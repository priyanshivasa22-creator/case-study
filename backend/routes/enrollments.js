const express = require('express');
const router = express.Router();
const { enrollInCourse, getMyEnrollments, unenroll } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, enrollInCourse);
router.get('/', protect, getMyEnrollments);
router.delete('/:id', protect, unenroll);

module.exports = router;
