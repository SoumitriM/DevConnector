const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const request = require('request');

// get the profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json('Profile Not Found!');
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create or update a profile
router.post('/', auth, async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    console.log('in backed', typeof skills)
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
})

// get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get profile by user id
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({message: 'Profile not found'});
    }
    res.json(profile);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({message: 'Profile not found'});
    }
    res.status(500).json(err);
  }
});

// delete profile by user id
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({message: 'User deleted!'});
  } catch (err) {
    res.status(500).json({message: 'Server error!'});
  }
});


//add experience

router.put('/experience', [
  auth,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('company', 'Company is required')
      .not()
      .isEmpty(),
    check('from', 'From is required')
      .not()
      .isEmpty(),
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({message: errors.array()[0].msg});
    }
    const {
      title, company, location, from, to, current, description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //experience -> array of objects(new exp is an object pushed to the array)
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      return res.status(500).json({message: 'Server error!'});
    }
  });

router.delete('/experience/:exp_id',
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
      if (removeIndex < 0) {
        return res.status(400).json({message: 'The experience doesn\'t exist'});
      }
      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (err) {
      return res.status(500).json({message: 'Server error!'});
    }
  });

  router.delete('/education/:edu_id',
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      if (removeIndex < 0) {
        return res.status(400).json({message: 'The education details doesn\'t exist'});
      }
      profile.education.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (err) {
      return res.status(500).json({message: 'Server error!'});
    }
  });

router.put('/education', [
  auth,
  [
    check('school', 'School is required')
      .not()
      .isEmpty(),
    check('degree', 'Degree is required')
      .not()
      .isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required')
      .not()
      .isEmpty(),
    check('from', 'From is required')
      .not()
      .isEmpty(),
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({message: errors.array()[0].msg});
    }
    const {
      school,
      degree,
      fieldofstudy, from, to, current, description
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //education -> array of objects(new exp is an object pushed to the array)
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      return res.status(500).json({message: 'Server error!'});
    }
  });

  router.get('/github/:username', (req, res) => {
    try {
      const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&
        client_id=${process.env.GITHUB_CLIENT_ID || config.get('githubClientId')}&client_secret=${process.env.GITHUB_SECRET || config.get('githubSecret')}`,
        method: 'GET',
        headers: {'user-agent': 'node.js'}
      }
      request(options, (error, response, body) => {
        if (error) console.error(error);
        if(response.statusCode !== 200) {
          res.status(404).json({message: 'No profile found'});
        };
        res.json(JSON.parse(body));
      })
    } catch (err) {
      return res.status(500).json({message: 'Server error!'});;
    }
  })
module.exports = router;