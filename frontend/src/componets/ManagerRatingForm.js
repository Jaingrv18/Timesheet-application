import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManagerRatingForm = ({timesheetId})=>{

    //rating state
    const[rating, setRating] = useState('');

    //handle form submission
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`/api/timesheet/rate/${timesheetId}`, {rating});
            alert('Rating submitted sucessfully');
            setRating('');
        }
        catch(err){
            console.error(err);
            alert('Error submitting rating');
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit} className='max-w-sm mx-auto pt-10'>
            <div className='mb-4'>
                <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='rating'>
                    Rating (1-5):
                </label>
                <input
                id='rating'
                type='number'
                min='1'
                max='5'
                value={rating}
                onChange={(e)=>setRating(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-none focus:shadow-outline'
                placeholder='Enter rating'
                />
            </div>

            <button type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
            focus:shadow-outline'>
                Submit Rating
            </button>
        </form>

        <div className='mt-4 text-center'>
            <Link to='/' className='text-blue-500 underline'> Back to Employee Timesheet</Link>
        </div>
        </>
    );
};

export default ManagerRatingForm;