import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function Header() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  // *********************Sign Out
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp < currentTime) {
          // Token is expired
          console.log("Token has expired. Clearing localStorage...");
          localStorage.removeItem("access_token"); // Remove the expired token
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("access_token"); // Clear token if invalid
      }
    }
    if (userToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });
  // In the useEffect dependencies if we will give an empty array like this [] it runs only once then it will never run again, but if we will not give any empty or dependent array it runs on every render.


  const headersLinks = [
    { labe: "Home", path: "/" },
    { labe: "About", path: "/about" },
    { labe: "Contact", path: "/contact" },
    { labe: "Movies", path: "/movies" },
  ];
  return (
    <div className="bg-red-300 h-20 rounded-b-xl items-center">
      <nav className="flex justify-between gap-5">
        <div className="m-4">
          <header className="text-4xl font-medium shadow-xl relative text-[#2C363F]">
            <Link to="/">MRS</Link>
          </header>
        </div>
        <div className="flex justify-between m-4 w-full">
          <div>
            <ul className="flex justify-between gap-2">
              {/****Here we used {} braces or explicit return statement in the map, thats way i return the <li>. If we dont want explicit return we can use implicit return which can be done using just () brace instead of the {} brace and then we don't need to return the <li> expilicitly******/}
              {headersLinks?.map((links, index) => {
                return (
                  <li
                    className="rounded-full bg-red-200 p-2 px-4 text-lg"
                    key={index}
                  >
                    <Link to={links.path}>{links.labe}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-row gap-3">
            {authenticated ? (
              <button
                className="bg-[#2C363F] p-2 text-white rounded-md w-[100px] text-lg"
                onClick={() => {
                  localStorage.clear("access_token");
                  setAuthenticated(false);
                }}
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  className="bg-[#2C363F] p-2 text-white rounded-md w-[100px] text-lg"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign In
                </button>
                <button
                  className="bg-[#2C363F] p-2 text-white rounded-md w-[100px] text-lg"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
