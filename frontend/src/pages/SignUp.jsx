import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { signupApi } from "../api";
import { notification } from "antd";
import Loader from "../components/Loader";

export default function SignUp() {
  const [formData, setFormData] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [userFailedMessage, setUserFailureMessage] = useState("");
  const [userSuccessMessage, setUserSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    try {
      setIsLoading(true);
      const result = await signupApi(formData);
      if (result.success === true) {
        // setUserSuccessMessage(result.message);
        // setTimeout(() => {
        //   setUserSuccessMessage("");
        // }, 3000);
        // return;
        notification.success({
          message: "Successful",
          description: result.message,
          duration: 3,
        });
        navigate('/signin')
      }
      if (result.success === false){
        // setUserFailureMessage(result.message);
        // setTimeout(() => {
        //   setUserFailureMessage("");
        // }, 3000);
        // return;
        notification.error({
          message: "Failed",
          description: result.message,
          duration: 3,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex flex-col w-fit m-[5%]">
      <div className="flex flex-col gap-4 pb-6 text-[#2C363F] font-semibold">
        <p className="text-4xl">
          Movie Reservation <br />
          System
        </p>
        <p className="text-[#8C8C8C]">Provide the following information</p>
      </div>
      <div className="flex justify-center w-fit p-20 mx-auto rounded-md border-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-4xl font-semibold text-center mb-5">SignUp</p>
          <div className="flex flex-col gap-7">
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label type="text" className="text-2xl font-medium">
                Enter Your Name
              </label>
              <input
                type="text"
                className="w-[300px] border-2 rounded-[3px] p-3 text-xl"
                placeholder="Name"
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label type="text" className="text-2xl font-medium">
                Enter Your Email
              </label>
              <input
                type="text"
                className="w-[300px] border-2 rounded-[3px] p-3 text-xl"
                placeholder="Email"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label type="text" className="text-2xl font-medium">
                Enter Your Passowrd
              </label>
              <input
                type="text"
                className="w-[300px] border-2 rounded-[3px] p-3 text-xl"
                placeholder="Password"
                name="password"
                value={formData?.password || ""}
                onChange={handleChange}
              />
            </div>
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label type="text" className="text-2xl font-medium">
                Confirm Password
              </label>
              <input
                type="text"
                className="w-[300px] border-2 rounded-[3px] p-3 text-xl"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {/* *******************Commented the below div tag because we are using antd package to show success or failed messages */}

            {/* <div>
              {error && (
                <p className="text-red-600 text-lg text-left">{error}</p>
              )}
              {userFailedMessage && (
                <p className="text-red-600 text-right text-lg">
                  {userFailedMessage}
                </p>
              )}
              {userSuccessMessage && (
                <p className="text-green-600 text-right text-lg">
                  {userSuccessMessage}
                </p>
              )}
            </div> */}
            <div className="flex mx-auto">
              <button
                type="submit"
                className="w-[400px] text-[#2C363F] border-2 border-[#2C363F] rounded-[3px] p-3 bg-[] uppercase font-semibold text-2xl"
              >
                {isLoading? <Loader/>:'Create Account'}
              </button>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-lg">
              Already have an account?{" "}
              <Link to='/signin'>
              <span className="text-blue-500 underline">SignIn</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
