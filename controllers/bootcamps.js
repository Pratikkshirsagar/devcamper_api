// @desc  Get All Bootcamps
// @route GET  /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

// @desc  Get single Bootcamps
// @route GET  /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show bootcamps ${req.params.id}` });
};

// @desc  Create new Bootcamp
// @route Post  /api/v1/bootcamps/
// @access Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamps' });
};

// @desc  Update new Bootcamp
// @route PUT  /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update bootcamps ${req.params.id}` });
};

// @desc  Delete new Bootcamp
// @route DELETE  /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete bootcamps ${req.params.id}` });
};
