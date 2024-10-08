import express from 'express';
import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';



const userRoutes = express.Router()

//TODO: redefine expriesIn
const genToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: '60d'})
}

// login
const loginUser = asyncHandler(async (req, res) => {
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

// verify Email

// password reset request

// password reset


userRoutes.route('/login').post(loginUser);

export default userRoutes;