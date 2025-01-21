import React, { useEffect, useState } from 'react'
import { createMovie } from '../../api';
import { DatePicker } from 'antd';
import Loader from '../../components/Loader';

export default function CreateMovie() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState('');
  const [date, setDate] = useState(null);


  console.log(formData)
  console.log(date)
    // useEffect(() => {
    //     const adminToken = localStorage.getItem("access_token");
    //     if (adminToken) {
    //       try {
    //         const decoded = jwtDecode(adminToken);
    //         const currentTime = Date.now() / 1000; // Current time in seconds
    //         if (decoded.exp < currentTime) {
    //           // Token is expired
    //           console.log("Token has expired. Clearing localStorage...");
    //           localStorage.removeItem("access_token"); // Remove the expired token
    //         }
    //       } catch (error) {
    //         console.error("Error decoding token:", error);
    //         localStorage.removeItem("access_token"); // Clear token if invalid
    //       }
    //     }
    //     if (adminToken) {
    //       setAuthenticated(true);
    //     } else {
    //       setAuthenticated(false);
    //     }
    //   });

    const showTime = [
      {
        date: formData.date,
        time: formData.time,
        capacity: formData.capacity,
        reservedSeats: '',
      }
    ]

      const requestBody = {
        title: formData.title,
        description: formData.description,
        genres: formData.genres,
        showTime: showTime,
      }

      const handleAddMovie = async (e)=>{
        e.preventDefault();
        try{
          console.log("request body" , requestBody)
            setIsLoading(true);
            const response = await createMovie(requestBody)
            setIsLoading(false);
        }catch(error){
            setIsLoading(false);
        }
      }

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const errorMessage = () => {
        console.log("required field");
      }
      
  return (
    <div>
      CreateMovie
      <form onSubmit={handleAddMovie} className='bg-red-200 flex flex-col gap-4 w-fit ml-8 p-4 font-mono text-md'>
        <h1 className='font-semibold text-4xl text-center'>Add New Movie</h1>
        <div className='flex flex-rox justify-between items-center'>
            <label htmlFor="" className=''>Title:</label>
            <input onChange={handleChange} name='title' type="text" className='w-[300px] border border-red-900 rounded-md p-2 ' placeholder='Title...' required />
        </div>
        <div className='flex flex-rox justify-between items-center'>
            <label htmlFor="" className=''>Genres:</label>
            <input onChange={handleChange} name='genres' className='w-[300px] border border-red-900 rounded-md p-2' placeholder='Genres...' required>
                
            </input>
        </div>
        <div className='flex flex-rox justify-between items-center'>
            <label htmlFor="" className=''>Seat Capacity:</label>
            <input onChange={handleChange} name='capacity' type='number' className='w-[300px] border border-red-900 rounded-md p-2' placeholder='123..' required/>
        </div>
        <div className='flex flex-rox justify-between items-center'>
            <label htmlFor="" className=''>Time to Show:</label>
            <input onChange={handleChange} name='time' className='w-[300px] border border-red-900 rounded-md p-2' placeholder='Time...' required/>
        </div>
        <div className='flex flex-rox justify-between items-center'>
            <label htmlFor="" className=''>Date:</label>
            {/* <DatePicker value={formData?.showTime?.date || null} name='date' 
            onChange={(date) => {
              const formattedDate = date ? format("DD/MM/YYYY") : null;
              setDate(formattedDate)
          }}
            className='w-[300px] border border-red-900 rounded-md p-2'></DatePicker> */}
            <input name='date' onChange={handleChange} type="date" className='w-[300px] border border-red-900 rounded-md p-2' required/>
        </div>



        {/* <div className='flex flex-rox justify-between items-center'>
            <label htmlFor="" className=''>Image:</label>
            <div className=''>
            <input type="file" accept='image/*' className='w-fit'/>
            </div>
        </div> */}
        <div className='flex flex-rox justify-between'>
            <label htmlFor="" className=''>Description:</label>
            {/* <input type="text" className='w-[300px] border border-red-900 rounded-md p-2 ' placeholder='Description...' /> */}
            <textarea name='description' id="" rows={4} className='p-2 w-[300px] border border-red-900 rounded-md'
            placeholder='Description...'
            onChange={handleChange}
            required></textarea>
        </div>
        <div className='flex flex-rox justify-center'>
            <button type='submit' className='py-3 px-[150px] border bg-red-400 rounded-md'>
                {isLoading? <Loader/>: 'Done'}
            </button>
        </div>
      </form>
    </div>
  )
}
