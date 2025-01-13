import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signin() {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState('');
  const [signinMessage, setSigninMessage] = useState("");
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(formData)

  const handleSignIn = async (e) =>{
    e.preventDefault();

    const userData = {
      email: formData.email,
      password: formData.password,
    }

    try{
      const response = await fetch('http://localhost:3000/api/auth/signin',{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formData), // We can send the data directly from formData or by creating other function. Like below
        // body: JSON.stringify(userData)
      })
      const result = await response.json()
      // console.log(result)
      if(result.success === true){
        // This code is being commented because when user becomes signedIn, we are navigating the user to home page and he will not see the message due to instatnly navigating to home page.

        // setSigninMessage(result.message)
        // setTimeout(()=>{
        //   setSigninMessage('')
        // }, 3000)
        Navigate('/')
      }
      if(result.success === false){
        setError(result.message)
        setTimeout(()=>{
          setError('')
        }, 3000)
      }
    }catch(error){
      console.error(error)
    }
  }

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
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <p className="text-4xl font-semibold text-center mb-5">SignIn</p>
          <div className="flex flex-col gap-7">
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label type="text" className="text-2xl font-medium">
                Email:
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
                Passowrd:
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
            <div>
              {error && (
                <p className="text-red-600 text-lg text-left">{error}</p>
              )}
              {signinMessage && (
                <p className="text-green-600 text-right text-lg">
                  {signinMessage}
                </p>
              )}
            </div>
            <div className="flex mx-auto">
              <button
                type="submit"
                className="w-[400px] text-[#2C363F] border-2 border-[#2C363F] rounded-[3px] p-3 bg-[] uppercase font-semibold text-2xl"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-lg">
              Dont have an account?{" "}
              <Link to='/signup'>
              <span className="text-blue-500 underline">SignUp</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
