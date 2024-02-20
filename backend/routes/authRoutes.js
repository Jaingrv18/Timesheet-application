const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Employee = require('../models/Employee');
const User = require('../models/User');
//Employee registration route

router.post('/reg', async(req,res)=>{
    const { name, email, password, reportingManager} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try{
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            reportingManager
        });
        const token = jwt.sign({ id: user._id}, 'secret_key', {expiresIn: 50000});
        res.status(201).send({auth: true, token, message: "User registered successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).send({message: "Error registering user"});
    }
    
})
router.post('/register', async(req, res)=>{
    const { name, email, password, reportingManager} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try{
        
        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            reportingManager
        });
        
        const token = jwt.sign({ id: employee._id}, 'secret_key', {expiresIn: 50000});
        res.status(201).send({auth: true, token});
    }
    catch(err){
        console.error(err);
        res.status(500).send({message: "Error registering employee"});
    }
    }
);

//Employee login route
router.post('/login', async(req,res)=>{
    const{ email, password} = req.body;
    try{
        const employee = await Employee.findOne({ email});
        if(!employee) return res.status(404).send({auth: false, message: "Employee not found"});
        
        const passwordIsValid = bcrypt.compareSync(password, employee.password);
        if(!passwordIsValid) return res.status(401).send({auth:false, message:'Invalid Password'});

        const token = jwt.sign({id: employee._id}, 'secret_key', {expiresIn: 50000});
        res.status(200).send({auth:true, token});
    }
    catch(err){
        console.err(err);
        res.status(500).send({message:"Error logging in"});
    }
    }
);
// router.get('/reporting-manager/:userId', async(req, res)=>{
//         const {userId} = req.params;
//         try{
//             const user = await User.findById(userId);
//             if(!user){
//                 return res.status(400).json({message:"User not found"});
//             }

//             const reportingManagerId=  user.reportingManager;

//             res.status(200).json({reportingManagerId});

//         }
//         catch(err){
//             console.error(err);
//             res.status(500).json({message:"Error getting reporting manager"});
//         }
//     }
// );

module.exports = router;