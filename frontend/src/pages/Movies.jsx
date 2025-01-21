import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { getMovies } from '../api';
import { Link } from 'react-router-dom';

export default function Movies(req) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const allMovies = async () => {
        setIsLoading(true);
        try {
          const result = await getMovies();
          setMovies(result);
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoading(false);
        }
      };
      // console.log(movies);
      allMovies();
      // setIsLoading(false);
    }, []);
  
  return (
    <div>
        <div>
      Movies
        </div>
        {isLoading ? (
        <div className='w-full h-screen flex justify-center items-center'>
        <Spin />
      </div>
      ) : (
        <>
        <div className="m-5 flex flex-col gap-5">
          <div>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-3">Now Selling</h1>
          <div className="flex flex-col gap-5">
            {movies?.data?.map((movies, index) => (
              <div
                key={index}
                className="flex flex-row w-[800px] border-b p-1 border-gray-200 rounded-lg "
              >
                <Link to='/movieDetails'>
                  <img className="rounded-t-lg w-[200px]" src="/src/image/MRS.png" alt="" />
                </Link>
                <div className="p-5">
                  <Link to='/movieDetails'>
                    <h5 className="inline-flex line-clamp-1 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {movies.title}
                    </h5>
                  </Link>
                  <p className="w-[500px] line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {movies.description}
                  </p>
                  <Link to='/movieDetails'
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        </>
      )}
    </div>

  )
}