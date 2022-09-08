const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/posts
// @desc testing route
// @access Public
router.get('/', (req, res) => res.send('posts route'));

router.post('/', 
[ 
  auth,
  [
    check('text', 'Text is Required')
    .not()
    .isEmpty(),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors : errors.array()});
  }
  try {


  } catch (err) {
  res.status(500).send('Server Error!');
}
})

module.exports = router;