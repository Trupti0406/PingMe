import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SIGNUP from "../images/signup.svg";
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "Female",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    // Validate passwords match
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // console.log(user);

    //api call to the backend
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/register`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res.data);

      // Handle the response
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }

    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "Female",
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen min-w-96">
      <div className="hero-content flex-col lg:flex-row-reverse items-center  max-w-[22rem] md:max-w-[60rem] bg-white p-8 shadow-2xl rounded-2xl">
        <div className="lg:text-left">
          <h1 className="text-5xl font-bold text-center md:text-start">
            Sign up with <span className="text-purple-400">PingMe!</span>
          </h1>
          <p className="py-6 text-xl hidden md:block">
            Create your account to connect with friends and family effortlessly.
            Enjoy secure messaging, media sharing, and so much more. Sign up now
            and be part of the conversation!
          </p>
          <div>
            <img
              src={SIGNUP}
              alt="signup-illustration"
              className="h-72 w-72 m-auto hidden md:block"
            />
          </div>
        </div>
        <div className="card bg-transparent min-w-96 ">
          <form className="card-body" onSubmit={submitHandler}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                required
                value={user?.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered"
                required
                value={user?.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
                value={user?.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Re-enter the password"
                className="input input-bordered"
                required
                value={user?.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Select Gender</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                required
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                <option selected>Female</option>
                <option>Male</option>
                <option>Rather not say</option>
              </select>
            </div>
            <label className="label">
              <span className="label-text">Already have an account?</span>
              <Link
                to="/login"
                className="underline label-text-alt link link-hover">
                Login here
              </Link>
            </label>
            <div className="form-control mt-2">
              <button
                type="submit"
                className="btn btn- bg-purple-300 hover:bg-purple-400">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
