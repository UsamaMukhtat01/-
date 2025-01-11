import React, { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [userCreate, setUserCreate] = useState('');

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
    if (
      formData.password !== confirmPassword ||
      !formData.password ||
      !confirmPassword
    ) {
      setError("Passwords do not match!");
      setInterval(() => {
        setError(null);
      }, 3000);
      return;
    }
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      // console.log(response);

      const result = await response.json();
      if (!result.OK) {
        setUserCreate(result.message || 'Failed to create user');
        setTimeout(() => {
          setUserCreate('');
        }, 3000);
        return;
      }
      {
        setUserCreate(result.message);
        setTimeout(() => {
          setUserCreate('');
        }, 3000);
        return;
      }
    } catch (error) {
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
            <div>
              {error && (
                <p className="text-red-600 text-lg text-left">{error}</p>
              )}
              {userCreate && (
                <p className="text-green-600 text-right text-lg">
                  {userCreate}
                </p>
              )}
            </div>
            <div className="mt-9 flex mx-auto">
              <button
                type="submit"
                className="w-[400px] text-[#2C363F] border-2 border-[#2C363F] rounded-[3px] p-3 bg-[] uppercase font-semibold text-2xl"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
