const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route GET api/auth
// @desc get user
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error!');
  }
});

const error = {
  email: "Email not valid",
  password: "Password is too short"
}

// @route GET api/auth
// @desc authenticate user and get token
// @access Public
router.post('/',
[
  check('email', error.email).isEmail(),
  check('password', error.password).exists()
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array()[0]});
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email});
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });      
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get('jwtToken'),
      {
        expiresIn: 36000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    )
  } catch(err) {
    res.status(500).json({message: 'Server Error!'});
  }

})

module.exports = router;