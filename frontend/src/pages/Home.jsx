
import React, { useEffect, useState } from "react";
import { getMovies } from "../api";
import { Spin } from "antd";
import {Link} from 'react-router-dom';

export default function Home() {
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
    <div className="bg-[]">
      <div>
        Home
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
          <div className="flex p-5 gap-5 flex-wrap border border-black rounded-lg">
            {movies?.data?.map((movies, index) => (
              <div
                key={index}
                className="w-[320px] justify-center mx-auto bg-red-300 border border-gray-200 rounded-lg shadow"
              >
                <Link to='/movieDetails'>
                  <img className="rounded-t-lg" src="/src/image/MRS.png" alt="" />
                </Link>
                <div className="p-5">
                  <Link to='/movieDetails'>
                    <h5 className="inline-flex mb-2 line-clamp-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {movies.title}
                    </h5>
                  </Link>
                  <p className="mb-3 line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
                    {movies.description}
                  </p>
                  {/* <Link to='/movieDetails'
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    More Details
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
          </div>
          <div>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-3">Coming Soon</h1>
          <div className="flex p-5 gap-5 flex-wrap border border-black rounded-lg">
            {movies?.data?.map((movies, index) => (
              <div
                key={index}
                className="w-[320px] justify-center mx-auto bg-red-300 border border-gray-200 rounded-lg shadow"
              >
                <a href="#">
                  <img className="rounded-t-lg" src="/src/image/MRS.png" alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 line-clamp-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {movies.title}
                    </h5>
                  </a>
                  <p className="mb-3 line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
                    {movies.description}
                  </p>
                  {/* <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                  </a> */}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

