import express from 'express';
import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import { sendPassswordResetEmail } from '../middleware/sendPasswordResetEmail.js';


const userRoutes = express.Router()

//TODO: redefine expriesIn
const genToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: '60d'})
}

// login
const loginUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
        user.firstLogin = false;
        await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            googleImage: user.googleImage,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
            active: user.active,
            firstLogin: user.firstLogin,
            created: user.createdAt,
        
        });
    } else {
        res.status(401).send('Invalid email or password.')
        throw new Error('User not found.')
    }
})

// register
const registerUser = expressAsyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400).send('We already have an account with that email address.')
    }

    const user = await User.create({
        name, 
        email, 
        password,
    });

    const newToken = genToken(user._id);

    sendVerificationEmail(newToken, email, name);

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            googleImage: user.googleImage,
            googleId: user.googleId,
            firstLogin: user.firstLogin,
            isAdmin: user.isAdmin,
            token: newToken,
            active: user.active,
            createdAt: user.createdAt,
        });
    } else {
        res.status(400).send('We could not register you.')
        throw new Error('Somthing went wrong. Please check your information and try again.')
    }
});

// verify Email
const verifyEmail = expressAsyncHandler( async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded.id);

        if(user) {
            user.active = true;
            await user.save()
            res.json('Thanks for activating your account. You can close this window now.');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        res.status(401).send('Email address could not be verified.')
    }
})

// password reset request
const passwordResetRequest = expressAsyncHandler(async(req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if(user) {
            const newToken = genToken(user._id);
            sendPassswordResetEmail(newToken, user.email, user.name, user._id);
            res.status(200).send(`We sent you a recovery email to ${email}`);
        }
    } catch (error) {
        res.status(401).send('There is not an account with such an email address.')
    }
})

// password reset
const passwordReset = expressAsyncHandler(async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
            const user = await User.findById(decoded.id);
    
            if(user) {
                user.password = req.body.password
                await user.save()
                res.json('Your password has been updated successfully.');
            } else {
                res.status(404).send('User not found.');
            }
        } catch (error) {
            res.status(401).send('Password reset failed.')
        }
});

// google login 
const googleLogin = expressAsyncHandler(async(req, res) => {
    const { googleId, email, name, googleImage } = req.body;

    try {
        const user = await User.findOne({ googleid: googleId });
        if(user) {
            user.firstLogin = false;
            await user.save()
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                googleImage: user.googleImage,
                googleId: user.googleId,
                firstLogin: user.firstLogin,
                isAdmin: user.isAdmin,
                token: genToken(user._id),
                active: user.active,
                createdAt: user.createdAt,
            });
        } else {
            const newUser = await User.create({
                name, 
                email, 
                googleImage, 
                googleId,
            });

            const newToken = genToken(newUser._id);

            sendVerificationEmail(newToken, newUser.email, newUser.name, newUser._id);
                res.json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    googleImage: newUser.googleImage,
                    googleId: newUser.googleId,
                    firstLogin: newUser.firstLogin,
                    isAdmin: newUser.isAdmin,
                    token: genToken(newUser._id),
                    active: newUser.active,
                    createdAt: newUser.createdAt,
                });
        }
    } catch (error) {
        res.status(404).send('Something went wrong, please try again later.');
    }
});


userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/verify-email').get(verifyEmail);
userRoutes.route('/password-reset-request').post(passwordResetRequest)
userRoutes.route('/password-reset').post(passwordReset);
userRoutes.route('/google-login').post(googleLogin);

export default userRoutes;
