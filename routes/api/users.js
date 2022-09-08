const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

// @route GET api/users
// @desc testing route
// @access Public
// router.get('/', (req, res) => res.send('User route'));
const error = {
  message: "Name is required",
  email: "Email is invalid"
}

const User = require('../../models/User');
const { JsonWebTokenError } = require('jsonwebtoken');

router.post('/',
  [
    check('name', error.message)
      .not()
      .isEmpty(),
    check('email', error.email).isEmail(),
    check('password', error.password).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({msg: 'User already exists'});
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({
        name,
        email,
        avatar,
        password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtToken'),
        {
          expiresIn: 360000000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  });

module.exports = router;