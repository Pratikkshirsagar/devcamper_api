const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
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

  // await bootcamp.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
