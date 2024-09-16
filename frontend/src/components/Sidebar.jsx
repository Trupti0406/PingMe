import React, { useState } from "react";
import UserItem from "./UserItem"; // Importing the new UserItem component
import useGetAllUsers from "../hooks/useGetAllUsers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setAuthUser, setSelectedUser } from "../redux/userSlice";

const Sidebar = ({ onSelectUser }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // Search state
  useGetAllUsers();

  const { allUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  if (!allUsers || allUsers.length === 0) {
    return (
      <div className="sidebar bg-white w-full lg:w-80 h-full flex flex-col p-4 border-r-2">
        <p>No users found</p>
      </div>
    );
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/logout`
      );
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null)); //loggin out the user from store as well
      dispatch(setSelectedUser(null));
    } catch (error) {
      toast.error("Failed to logout.");
    }
  };

  // Filter users based on search input
  const filteredUsers = allUsers.filter(
    (user) => user?.fullName?.toLowerCase().startsWith(search.toLowerCase()) // Filter users by name starting with search query
  );

  return (
    <div className="sidebar bg-white w-full lg:w-80 h-full flex flex-col p-4 border-r-2">
      {/* Search bar */}
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <label className="input input-bordered flex items-center gap-2 mb-4 h-10 bg-slate-200">
          <input
            type="text"
            className="grow"
            placeholder="Search users to chat with..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update search on input change
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </label>
      </form>

      {/* User list or "No such user found" message */}
      <div className="user-list flex-1 overflow-y-scroll hide-scrollbar">
        {filteredUsers.length > 0 ? (
          <ul>
            {/* Map over filtered users */}
            {filteredUsers.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                onSelectUser={onSelectUser}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No such user found</p> // Show this message if no users match the search
        )}
      </div>

      {/* Logout button */}
      <div className="mt-4">
        <button
          onClick={logoutHandler}
          className="btn btn- bg-purple-300 hover:bg-purple-400 w-full">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
