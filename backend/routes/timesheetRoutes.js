const express = require('express');
const router = express.Router();
const Timesheet = require('../models/TimeSheet');
const verifyToken = require('../middleware/authMiddleware');


router.post('/submit', async(req, res)=>{
    const { employeeId, hoursWorked} = req.body;
    if(!employeeId || !hoursWorked){
        return res.status(400).send({message: "Employee ID and hours worked are required"});
    }

    try{
        const timesheet = await Timesheet.create({
           
            employee: employeeId,
            hoursWorked
        });
        
        res.status(201).send(timesheet);
    }
    catch(err){
        console.err(err);
        res.status(500).send({message:"Error submitting timesheet"});
    }
});

//Rate timeshett route
router.put('/rate/:timesheetId', verifyToken, async(req, res)=>{
    const{timesheetId} = req.params;

    const {rating} = req.body;
    if(!rating || rating<1 || rating>5){
        return res.status(400).send({message:'Rating must be between 1 and 5'});
    }

    try{
        const updatedTimeSheet = await Timesheet.findByIdAndUpdate(timesheetId, {rating}, {new:true});
        if(!updatedTimeSheet){
            return res.status(400).send({message:"Timesheet not found"});
        }
        res.status(200).send(updatedTimeSheet);
    }
    catch(err){
        console.err(err);
        res.status(500).send({message:'Error rating timesheet'});
    }
});

module.exports = router;