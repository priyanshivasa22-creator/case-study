const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, deleteCourse } = require('../controllers/courseController');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
