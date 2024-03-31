import asyncHandler from 'express-async-handler';
import ErrorHandler from '../middlewares/error.js';
import { Task } from '../models/taskSchema.js';

//create a task
export const createTask = asyncHandler(async(req, res, next) => {
    const {title, description} = req.body;
    if(!title || !description) {
        return next(new ErrorHandler("Please enter both title and description",400));
    }

    const task = await Task.create({title, description, createdBy : req.user._id});
    res.status(200).json({
        success:true,
        message : "Task created successfully",
        task
    })
});

//fetch all task for the logged-in user
export const fetchTask = asyncHandler(async(req, res, next) => {
    const tasks = await Task.find({createdBy : req.user._id});
    res.status(200).json({
        success : true,
        tasks
    })
})

//update a task
export const updateTask = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const {title, description, status} = req.body;
    const task = await Task.findByIdAndUpdate(id, {title, description, status, updatedAt : Date.now()}, {new : true, runValidators : true, useFindAndModify : false});
    if(!task) {
        return next(new ErrorHandler("Oops, Task not found!",404));
    }
    res.status(200).json({
        success: true,
        message: "Task updated successfully!"
    })
})

//delete a task 
export const destroyTask = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    let task = await Task.findById(id);
    if(!task) {
        return next(new ErrorHandler("Oops, Task not found!",404));
    }
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task deleted successfully!"
    })
})

