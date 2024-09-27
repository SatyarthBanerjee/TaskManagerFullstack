const Data = require("../Models/model");
// const mongoose = require("mongoose")
const { User, Task } = require("../Models/userregistration");
// const { User, Task } = require("../Models/model");

const createData = async (req, res) => {
  const { task, tag, check, date, mytype, userId } = req.body;
  console.log(userId);
  try {
    // Check if the task already exists for the given user and mytype
    let data = await User.findOne({ user: userId });

    if (data) {
      // If task exists, update it based on mytype
      if (mytype === "today") {
        data.todaydetails.push({ task, tag, check, date });
      } else if (mytype === "tomorrow") {
        data.tomorrowdetails.push({ task, tag, check, date });
      } else if (mytype === "upcoming") {
        data.upcomingdetails.push({ task, tag, check, date });
      }
    } else {
      // If task doesn't exist, create a new one based on mytype
      if (mytype === "today") {
        data = new Task({
          user: userId,
          todaydetails: [{ task, tag, check, date }],
        });
      } else if (mytype === "tomorrow") {
        data = new Task({
          user: userId,
          tomorrowdetails: [{ task, tag, check, date }],
        });
      } else if (mytype === "upcoming") {
        data = new Task({
          user: userId,
          upcomingdetails: [{ task, tag, check, date }],
        });
      }
    }

    // Check if data is not null or undefined before saving
    if (data) {
      await data.save();
      res.status(201).json(data);
    } else {
      res.status(404).json({ error: "Task not found for the user" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
const createDataGoogle = async (req, res) => {
  const { task, tag, check, date, mytype, email } = req.body;
  console.log(email, task, tag, date, mytype);
  try {
    let data = await Task.findOne({ email: email });
    console.log(data);
    if (data) {
      if (mytype === "today") {
        data.todaydetails.push({ task, tag, check, date });
      } else if (mytype === "tomorrow") {
        data.tomorrowdetails.push({ task, tag, check, date });
      } else if (mytype === "upcoming") {
        data.upcomingdetails.push({ task, tag, check, date });
      }
    } else {
      if (mytype === "today") {
        data = new Task({ email, todaydetails: [{ task, tag, check, date }] });
      } else if (mytype === "tomorrow") {
        data = new Task({
          email,
          tomorrowdetails: [{ task, tag, check, date }],
        });
      } else if (mytype === "upcoming") {
        data = new Task({
          email,
          upcomingdetails: [{ task, tag, check, date }],
        });
      }
    }

    // Create a new task based on the mytype and the provided email

    // Check if data is not null or undefined before saving
    if (data) {
      await data.save();
      res.status(201).json(data);
    } else {
      res.status(400).json({ error: "Invalid request" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Other controllers for getting, updating, or deleting tasks
const getAllData = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    // Find all tasks associated with the provided email
    const tasks = await Task.findOne({ email });

    if (tasks) {
      // console.log(tasks);
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ error: "No tasks found for the provided email" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  const { username_or_email, password, fullname } = req.body;
  try {
    const userExist = await User.findOne({ username_or_email });
    if (!userExist) {
      try {
        const data = await User.create({
          username_or_email,
          password,
          fullname,
        });
        res.status(201).json(data);
      } catch (error) {
        res.status(401).json(error.message);
      }
    } else if (userExist) {
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(500).json("Error in Saving");
  }
};
const checkuser = async (req, res) => {
  const { username_or_email, password } = req.body;
  try {
    const userExist = await User.findOne({ username_or_email, password });
    console.log(username_or_email);
    if (userExist) {
      // console.log(userExist);

      return res.status(200).json(userExist);
    } else if (!userExist) {
      return res.status(400).json(false);
    }
  } catch (error) {
    return res.status(401).json(error.message);
  }
  // res.end()
};
const check = async (req, res) => {
  const { check, email, taskId, mytype } = req.body; 
  console.log(check, email, taskId, mytype);// taskId is the identifier of the task to update
  
  try {
    let data;
    
    // Find the task based on the provided email and taskId
    if (mytype === "today") {
      data = await Task.findOneAndUpdate(
        { email: email, "todaydetails._id": taskId },
        { $set: { "todaydetails.$.check": check } },
        { new: true }
      );
    } else if (mytype === "tomorrow") {
      data = await Task.findOneAndUpdate(
        { email: email, "tomorrowdetails._id": taskId },
        { $set: { "tomorrowdetails.$.check": check} },
        { new: true }
      );
    } else if (mytype === "upcoming") {
      data = await Task.findOneAndUpdate(
        { email: email, "upcomingdetails._id": taskId },
        { $set: { "upcomingdetails.$.check": check } },
        { new: true }
      );
    }

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Task not found or unable to update check status" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
const updateTask = async(req,res)=>{
  try {
    const { tasks } = req.body;

    // Loop through the tasks and update them in the database
    for (const task of tasks) {
      // Assuming Task is your Mongoose model
      await Task.findByIdAndUpdate(task._id, { mytype: 'today' });
    }

    res.status(200).json({ message: 'Tasks updated successfully' });
  } catch (error) {
    console.error('Error updating tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
const deleteTask = async (req, res) => {
  const { taskID, email, mytype } = req.body; // Get taskID, email, and mytype from the request body

  try {
    if (!taskID) {
      return res.status(400).json({ error: "Task ID is required" });
    }
    if (!email || !mytype) {
      return res.status(400).json({ error: "Email and mytype are required" });
    }

    // Determine which array to use based on mytype
    const updateFields = {};
    if (mytype === "today") {
      updateFields["todaydetails"] = { $pull: { _id: taskID } };
    } else if (mytype === "tomorrow") {
      updateFields["tomorrowdetails"] = { $pull: { _id: taskID } };
    } else if (mytype === "upcoming") {
      updateFields["upcomingdetails"] = { $pull: { _id: taskID } };
    } else {
      return res.status(400).json({ error: "Invalid mytype" });
    }

    const result = await Task.findOneAndUpdate(
      { email: email }, // Query by email
      updateFields,
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error Deleting Task:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  createData,
  getAllData,
  createUser,
  checkuser,
  createDataGoogle,
  check,
  updateTask,
  deleteTask
  //   getDataById,
  //   deleteDataByItd,
  //   updateData,
};
