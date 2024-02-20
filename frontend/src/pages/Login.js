import React, {useState} from 'react';
import axios from 'axios';

const Login = ()=>{
    const[formData, setFormData] = useState({email:'', password:''});

    const handleChange = (e)=>{
        const{name, value} = e.target;
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log("User logged in", response.data);
        }
        catch(err){
            console.error("Error logging in:", err.response.data.message);
        }
    };

    return(
        <>
        <h2 className='block text-gray-700 text-base font-bold mb-2'>Login</h2>
            <form onSubmit={handleSubmit} className='max-w-sm mx-auto pt-10'>
        
            <input type='email' name='email' placeholder='Email' value={formData.email} 
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline'/>
            <input type='password' placeholder='password' name='password' value={formData.password}
            onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline'/>

            <button type='submit'className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
         focus:outline-none focus:shadow-outline'>Login</button>
            </form>
        </>
    )
}
export default Login;