import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : 5
    },
    description : {
        type : String,
        required : true,
        minLength : 10,
        maxLength : 255,
    },
    status : {
        type : String,
        required : true,
        enum : ["Pending", "Completed"],
        default : "Pending",
    },
    createdAt : {
        type : Date,
        default : Date.now,
        required : true
    },
    updatedAt : {
        type : Date,
        default : Date.now,
        required : true
    },
    createdBy : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    }
});

export const Task = mongoose.model("Task", taskSchema);
