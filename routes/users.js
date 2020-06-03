const express = require('express');
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteeUser,
} = require('../controllers/users');
const router = express.Router({ mergeParams: true });

const User = require('../models/User');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteeUser);

module.exports = router;
