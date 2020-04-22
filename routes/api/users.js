const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');


// @route   POST api/users
// @desc    Register user
// @access  Public

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', "Please include a valid email")
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })        
],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // if there are errors
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;
    try {
        //1- see if user exists
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        //2- get users gravatar
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
        //create a SALT
        const salt = await bcrypt.genSalt(10);
        //3- encrypt password w/ bcrypt
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //4- return jwt
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, 
            config.get('SECRET_STR  ING'),
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
});

module.exports = router;