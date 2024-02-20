import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeTimeSheetForm = ({employeeId})=>{

    //hours worked
    const[hoursWorked, setHoursWorked] = useState('');

    //handle form submission
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('/api/timesheet/submit', {employeeId, hoursWorked});
            alert('Timesheet submitted sucessfully');
            setHoursWorked('');
        }
        catch(err){
            console.error(err);
            alert('Error submitting timesheet');
        }
    }


return(
    <>
    <form onSubmit={handleSubmit} className='max-w-sm mx-auto pt-10'>
        <div className='mb-4'>
            <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='hoursWorked'>
                Hours Worked:
            </label>
            <input 
            id='hoursWorked'
            type='number'
            value={hoursWorked}
            onChange={(e)=> setHoursWorked(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter hours worked' 
            />

        </div>
        <button type='submit'
         className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
         focus:outline-none focus:shadow-outline'>
            Submit
         </button>
    </form>
    
    <div className='mt-4 text-center'>
        <Link to={`/manager-rating/${employeeId}`}
        className='text-blue-500 underline'>Rate Employee</Link>
    </div>
    </>
);


};


export default EmployeeTimeSheetForm;