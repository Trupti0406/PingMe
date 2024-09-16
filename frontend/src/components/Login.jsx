import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";
import LOGIN from "../images/login.svg";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  // console.log(process.env.REACT_APP_API_BASE_URL);
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/login`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      navigate("/");
      dispatch(setAuthUser(res.data));
      // console.log(res);
      toast.success(`Welcome to PingMe, ${user?.userName}!`, {
        duration: 4000,
        position: "top-center",
        icon: "👋",
      });
      // console.log(res);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
    setUser({
      userName: "",
      password: "",
    });
  };
  return (
    <div className="hero bg-base-200 min-h-screen min-w-96">
      <div className="hero-content flex-col lg:flex-row-reverse items-center max-w-[22rem] md:max-w-[60rem] bg-white p-8 shadow-2xl rounded-2xl">
        <div className="lg:text-left">
          <h1 className="text-5xl font-bold text-center md:text-start">
            Login with <span className="text-purple-400">PingMe!</span>
          </h1>
          <p className="py-6 text-xl hidden md:block">
            Reconnect with your friends and family in an instant. Dive back into
            seamless, real-time conversations, and never miss a moment. Log in
            to start chatting now!
          </p>
          <div>
            <img
              src={LOGIN}
              alt="login-illustration"
              className="h-72 w-72 m-auto hidden md:block"
            />
          </div>
        </div>
        <div className="card bg-transparent min-w-96 max-w-sm shrink-0">
          <form className="card-body" onSubmit={submitHandler}>
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

            <label className="label">
              <span className="label-text">New to PingMe?</span>
              <Link
                to="/register"
                className="underline label-text-alt link link-hover">
                Signup here
              </Link>
            </label>
            <div className="form-control mt-2">
              <button className="btn btn- bg-purple-300 hover:bg-purple-400">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
