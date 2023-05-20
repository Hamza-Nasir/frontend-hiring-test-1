import React, { useState, useContext, useLayoutEffect } from "react";
import axios from "axios";
import { Navbar } from "../components";

import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const { setAuthData, token } = useContext(AuthContext);
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      user: formData.userName,
      token: "your_access_token",
    };

    axios.post("https://frontend-test-api.aircall.io/auth/login", {
        username: formData.userName,
        password: formData.password
    })
    .then((res) => {
        const data = {
            user: res.data.user,
            access_token: res.data.access_token,
        }

        setAuthData(data);

    }).catch((err) => {
        console.log(err.message);
    })

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  useLayoutEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token]);

  return (
    <>
      <Navbar loggedIn={false} />
    <div className="w-full h-screen bg-[#f4eeee]">
      <div className="absolute w-1/2 h-1/3 top-1/4 left-1/4 bg-white rounded-sm">
        <form onSubmit={handleSubmit} className="flex flex-col  gap-10 w-full h-full px-8 py-8">
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-1">
              <p className="text-red-600 text-lg font-bold">*</p>
              <p className="text-lg">User Name</p>
            </div>
            <input
              type="text"
              required
              className="w-[98%] h-10 border-2 border-gray-300 text-lg rounded-sm p-4"
              placeholder="Your name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-1">
              <p className="text-red-600 text-lg font-bold">*</p>
              <p className="text-lg">Password</p>
            </div>
            <input
              type="password"
              required
              className="w-[98%] h-10 border-2 border-gray-300 rounded-sm p-4 "
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit"  className="w-24 h-14 bg-blue-500 text-white text-xl font-bold rounded-sm">
            Log in
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
}

export default LogIn;
