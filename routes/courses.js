const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deletCourse,
} = require('../controllers/courses');
const router = express.Router({ mergeParams: true });

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
  .post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deletCourse);

module.exports = router;
