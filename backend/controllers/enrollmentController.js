const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll a student in a course
// @route   POST /api/enrollments
exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.student._id;

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Check course capacity
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollmentCount = await Enrollment.countDocuments({ courseId });
    if (enrollmentCount >= course.capacity) {
      return res.status(400).json({ message: 'Course is full' });
    }

    const enrollment = await Enrollment.create({ studentId, courseId });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get enrollments for logged-in student
// @route   GET /api/enrollments
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.student._id })
      .populate('courseId');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Unenroll from a course
// @route   DELETE /api/enrollments/:id
exports.unenroll = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    if (enrollment.studentId.toString() !== req.student._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await enrollment.deleteOne();
    res.json({ message: 'Unenrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
