const express = require('express');
const request = require('request');

const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')
// MODEL(S)
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    GET current users profile
// @access  Private

router.get('/me', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
        [ 'name', 'avatar' ]);
        // Check to see if there is NO profile
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

// @route   POST api/profile
// @desc    CREATE || UPDATE user profile
// @access  Private
router.post('/', [ auth, [
    check('status', 'Status is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills is required')
        .not()
        .isEmpty()    
] ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Pull out properties from the request body object
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
        linkedIn
    } = req.body;
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    // Check if they're coming in
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        // Turn skills object into an array
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    // Build social object
    profileFields.social = {};
    // check if they're coming in
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedIn) profileFields.social.linkedIn = linkedIn;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        // 1 take profile model and find by the user
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            // If true then UPDATE the profile
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, 
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        };
        // If false then CREATE profile
        profile = new Profile(profileFields);
        // Save the profile
        await profile.save();
        // return the profile in the response object
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    console.log(profileFields.skills);

    res.send("hello")
});


// @route   GET api/profile
// @desc    GET all profiles
// @access  Public
router.get('/', async (req,res) => {
    try {
        // get profiles by find
        const profiles = await Profile.find().populate('user', [ 'name', 'avatar' ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   GET api/profile/user/:user_id
// @desc    GET profile by user ID
// @access  Public
router.get('/user/:user_id', async (req,res) => {
    try {
        // get profiles by find
        const profile = await Profile
                            .findOne({ user: req.params.user_id })
                            .populate('user', [ 'name', 'avatar' ]);
        
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });                    
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        // check for certain kind of message
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send('Server Error')
    }
});

// @route   DELETE api/profile
// @desc    DELETE profile, user, & post.
// @access  Private
router.delete('/', auth, async (req,res) => {
    try {
        // remove users posts 
        //  * must remove posts prior to the removal of account || profile from array of users *
        await Post.deleteMany({ user: req.user.id });
        // bc if you dont then the posts will still be parsed to the database Post model
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [auth, [
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'Company is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty()    
] ], async (req, res) => {
    // in react we are going to have a form for this
    // -------
    // create errors object
    const errors = validationResult(req);
    // check if we have any errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // get body data
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    // make new experience object
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
        // fetch profile
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   DELETE api/profile/experience/:exp_id
// @desc    DELETE experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        //get profile
        const profile = await Profile.findOne({ user: req.user.id });

        // get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
// =====================


// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth, [
    check('school', 'School is required')
        .not()
        .isEmpty(),
    check('degree', 'Degree is required')
        .not()
        .isEmpty(),
    check('fieldOfStudy', 'Field of study is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty()    
] ], async (req, res) => {
    // in react we are going to have a form for this
    // -------
    // create errors object
    const errors = validationResult(req);
    // check if we have any errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // get body data
    const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = req.body;

    // make new experience object
    const newEdu = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    };

    try {
        // fetch profile
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   DELETE api/profile/education/:edu_id
// @desc    DELETE education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        //get profile
        const profile = await Profile.findOne({ user: req.user.id });

        // get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   GET api/profile/github/:username
// @desc    GET user repos from github
// @access  Public
router.get('/github/:username', (req, res) => {
    try {
        // Construct options object with a uri
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('GITHUB_CLIENT_ID')}&client_secret=${config.get('GITHUB_SECRET')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        // make request
        request(options, (err, response, body) => {
            if (err) console.error(err);
            // check for 200 response
            if (response.statusCode !== 200) {
                // otherwise 404
                return res.status(404).json({ msg: 'No github profile found' })
            }
            //else Send the json response of the body
            res.json(JSON.parse(body))

        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;