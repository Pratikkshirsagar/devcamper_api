const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deletCourse,
} = require('../controllers/courses');
const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deletCourse);

module.exports = router;
