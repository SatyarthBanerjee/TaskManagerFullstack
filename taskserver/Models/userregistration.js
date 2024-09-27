const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username_or_email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        trim: true
    }
},{timestamps:true});

const User = mongoose.model("User", userSchema);
const taskSchema = new Schema({
    email:{
        type: String,
        required:false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    todaydetails: [{
        task: { type: String, required: false },
        tag: { type: String, required: false },
        check: { type: Boolean, default: false },
        date: { type: Date, required: false }
    }],
    tomorrowdetails: [{
        task: { type: String, required: false },
        tag: { type: String, required: false },
        // status: { type: Boolean, default: false },
        date: { type: Date, required: false }
    }],
    upcomingdetails: [{
        task: { type: String, required: false },
        tag: { type: String, required: false },
        // status: { type: Boolean, default: false },
        date: { type: Date, required: false }
    }],
    // Add more fields for other types of tasks if needed
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);


module.exports = {User, Task};
