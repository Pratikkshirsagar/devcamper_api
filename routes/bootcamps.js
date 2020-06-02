const express = require('express');
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

// * Includes other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// * Re-route into other resouce router
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(bootcampPhotoUpload);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
