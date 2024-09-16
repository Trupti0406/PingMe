import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
const UserItem = ({ user, onSelectUser }) => {
  const disapatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user?._id);
  // console.log(onlineUsers);s
  const selectedUserHandler = (user) => {
    disapatch(setSelectedUser(user));
  };
  return (
    <li className="mb-2" onClick={() => selectedUserHandler(user)}>
      <div
        className={`${
          selectedUser?._id === user?._id ? "bg-slate-300 " : ""
        }flex items-center p-2 hover:bg-slate-200 cursor-pointer`}
        onClick={() => onSelectUser(user)}>
        <div className={`avatar w-14 rounded-full ${isOnline ? "online" : ""}`}>
          <img
            src={user?.profilePhoto}
            alt={`${user?.userName}'s pfp`}
            className="rounded-full"
          />
        </div>
        <p className="ml-2 text-md">{user?.fullName}</p>
      </div>
    </li>
  );
};

export default UserItem;
