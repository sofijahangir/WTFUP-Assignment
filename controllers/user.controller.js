const db = require('../models');

const User = db.user;

// FUNCTION TO FIND THE USER BY ID

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};

// FUNCTION TO FIND ONE USER

exports.readUser = (req, res) => {
  const user = req.profile;
  res.status(200).send(user);
};
// FUNCTION TO FIND All USERs
exports.readAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).send({ message: 'No users found' });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
