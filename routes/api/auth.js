const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const s = process.env.SHHH
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
// Bring in MIDDLEWARE
const auth = require('../../middleware/auth');
// MODEL(S)
const User = require('../../models/User');


// @route   GET api/auth
// @desc    test route
// @access  Public

router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!')
    }
});


// ----------------
// @route   POST api/auth
// @desc    Authenticate user & "GET THE TOKEN"
// @access  Public

router.post('/', [
    check('email', "Please include a valid email")
        .isEmail(),
    check('password', 'Password is required!')
        .exists()        
],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // if there are errors
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        //===============*|_\SECURITY/_|*==============
        //1- see if user DOES NOT exist
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
        
        //need to match email and password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
        //===============*|_/SECURITY\_|*==============
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, 
            s,
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;