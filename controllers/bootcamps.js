const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocode');
const Bootcamp = require('../models/Bootcamp');

// * @ desc  Get All Bootcamps
// * @route GET  /api/v1/bootcamps
// * @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res.status(200).json({ success: true, data: bootcamp });
});

// * @desc  Get single Bootcamps
// * @route GET  /api/v1/bootcamps/:id
// * @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp not found with id of  ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// * @desc  Create new Bootcamp
// * @route Post  /api/v1/bootcamps/
// * @access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// * @desc  Update new Bootcamp
// * @route PUT  /api/v1/bootcamps/:id
// * @access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp not found with id of  ${req.params.id}`,
      404
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// * @desc  Delete new Bootcamp
// * @route DELETE  /api/v1/bootcamps/:id
// * @access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp not found with id of  ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: {} });
});

// * @desc  Get a bootcamp with a radius
// * @route GET  /api/v1/bootcamps/radius/:zipcode/:distance
// * @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // * Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // * Calc radius using radians
  // * divide dist by radius of earth
  // * Earth Radius = 3,963 mi / 6,378 Km

  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
