import asyncHandler from 'express-async-handler';
import {User} from '../models/userSchema.js';
import {sendToken} from '../utils/jwtToken.js';
import ErrorHandler from '../middlewares/error.js';

//SignUp User
export const registerUser = asyncHandler(async(req, res, next) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        return next(new Error("Please enter all details", 400));
    }

    let user = await User.findOne({email});
    if(user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({
        username, email, password
    })

    sendToken(user, 200, "User registered successfully", res);
})

//login user
export const login = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new ErrorHandler("Please fill full fields!", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid email or password!!", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    sendToken(user, 200, "User Logged in Successfully", res);
})

//logout user
export const logout = asyncHandler((req, res, next) => {
    res.status(200).cookie("token","", {
        expires : new Date(Date.now()),
        httpOnly : true,
    }).json({
        success : true,
        message : "User Logged out successfully"
    })
});