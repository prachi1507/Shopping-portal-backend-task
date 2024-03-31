import asyncHandler from 'express-async-handler';
import { User } from '../models/userSchema.js';
import ErrorHandler from './error.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = asyncHandler(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decodedPassword = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedPassword.id);
    next();
});