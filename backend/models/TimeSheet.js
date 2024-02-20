const mongoose = require('mongoose');


const timesheetSchema = new mongoose.Schema({
    
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    date: {
        type: Date,
        default: Date.now
    },
    hoursWorked: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('Timesheet', timesheetSchema);