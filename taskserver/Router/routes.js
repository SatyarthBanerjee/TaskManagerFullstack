const express = require("express");
const router = express.Router();
// const Data = require("../Models/model")
const {
    createData,
    getAllData,
    createUser,
    checkuser,
    createDataGoogle,
    check,
    updateTask,
    deleteTask
    // getDataById,
    // deleteDataByItd,
    // updateData
} = require('../Controller/Controller')
const arr =[];
// router.use(express.json())
router.post("/",getAllData)
// router.get("/:id",getDataById)
router.post('/', createData)
router.post("/createuser", createUser)
router.post("/checkuser", checkuser);
router.post('/creategoogledata', createDataGoogle);
router.put('/check', check);
router.put("/api/updatetodaytasks",updateTask )
router.delete("/deletetask",deleteTask)

// router.patch("/:id",updateData)
// router.delete("/:id",deleteDataByItd)
module.exports=router