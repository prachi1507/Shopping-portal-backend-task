import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please enter username"],
        unique : true,
    },
    email : {
        type : String,
        required : [true, "Please enter email"],
        validate : [validator.isEmail, "Please enter a valid email"],
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
        select : false
    }
});

userSchema.pre("save", async function() {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//generate token 
userSchema.methods.generateToken = function() {
    return jwt.sign({id : this._id},
        process.env.JWT_SECRET_KEY, 
        {expiresIn : process.env.JWT_EXPIRE});
};

export const User = mongoose.model("User", userSchema);