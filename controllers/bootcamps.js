const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// * @ desc  Get All Bootcamps
// * @route GET  /api/v1/bootcamps
// * @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// * @desc  Get single Bootcamps
// * @route GET  /api/v1/bootcamps/:id
// * @access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of  ${req.params.id}`,
        404
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// * @desc  Create new Bootcamp
// * @route Post  /api/v1/bootcamps/
// * @access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

// * @desc  Update new Bootcamp
// * @route PUT  /api/v1/bootcamps/:id
// * @access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// * @desc  Delete new Bootcamp
// * @route DELETE  /api/v1/bootcamps/:id
// * @access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of  ${req.params.id}`,
        404
      );
    }

    // await bootcamp.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(err);
  }
};
