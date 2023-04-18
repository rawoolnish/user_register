const express = require('express');
const router = express.Router();
require('../db');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler")
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;



router.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Enter a valid passkey').isLength({ min: 4 }),
], asyncHandler(async (req, res) => {
    //if error => return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors })
    }

    try {
        //check if user is already exists!
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            res.status(400);
            throw new Error("User Already exists")
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword;

        //Create new user
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: "User created successfully",
            success: true
        })

    } catch (error) {
        res.status(400)
        throw new Error("Error Occured!")
    }
}))

router.post("/login", [
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    //if erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }
    const { email, password } = req.body;

    try {
        //If user does not exist
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, error: "User not found !" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Invalid credentials" })
        }
        const data = {
            user: { id: user.id }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: authtoken
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error Occured")
    }

})
router.put('/userUpdate', fetchUser, asyncHandler(async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId)
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt)
                req.body.password = hashedPassword;
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            const data = {
                user: { id: updatedUser.id }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: authtoken
            })
        } else {
            res.status(404).send("Something went wrong")
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured!")
    }

}))
module.exports = router;