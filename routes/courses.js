const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deletCourse,
} = require('../controllers/courses');
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

const Courses = require('../models/Course');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(
    advancedResults(Courses, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deletCourse);

module.exports = router;
