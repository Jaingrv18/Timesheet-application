
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

//Database connection
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://garvjain1304:12345%40%21@timesheet1.vaon57t.mongodb.net/management?retryWrites=true&w=majority")
.then(()=>console.log("Database Connected"))
.catch(err=>console.log(err));

const authRoutes = require('./routes/authRoutes');
const timesheetRoutes = require('./routes/timesheetRoutes');

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("server is running");
});
app.use('/api/auth', authRoutes);
app.use('/api/timesheet', timesheetRoutes);


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});