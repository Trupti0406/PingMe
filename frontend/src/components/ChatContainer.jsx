import React, { useEffect } from "react";
import { SendMessageInput } from "./SendMessageInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import NEWUSERCHAT from "../images/new-user-chat.svg";
const ChatContainer = ({ onBack }) => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  // cleanup function so user logs out
  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // }, []);
  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col w-full h-full bg-white">
          <div className="flex items-center justify-between p-4 bg-white border-b-2">
            <div className="flex items-center">
              <div className="md:hidden ">
                <button
                  className="p-0 bg-transparent btn-lg pr-2 text-4xl font-extrabold"
                  onClick={onBack}>
                  {`<`}
                </button>
              </div>
              <div className="avatar w-12 rounded-full mr-4">
                <img
                  src={selectedUser?.profilePhoto}
                  alt="User Avatar"
                  className="rounded-full"
                />
              </div>
              {/* User Name */}
              <div>
                <h2 className="font-bold text-lg">
                  {selectedUser?.fullName || "John Doe"}
                </h2>
                <p
                  className={`text-sm  ${
                    isOnline
                      ? "text-success font-semibold"
                      : "text-gray-500  font-semibold"
                  }`}>
                  {isOnline ? "online " : "offline"}
                </p>
              </div>
            </div>
          </div>

          {/* Chat messages container */}
          <div className="chat-container flex-1 p-4 overflow-y-scroll hide-scrollbar">
            {/* Example chat */}
            <Messages />
          </div>

          {/* Input bar */}
          <SendMessageInput />
        </div>
      ) : (
        <div className="h-full flex justify-center items-center flex-col">
          <p className="font-extrabold text-3xl text-center mb-4">
            Hi, {authUser?.fullName}, <br />
            Start conversations now!
          </p>
          <img src={NEWUSERCHAT} alt="New User Chat" className="h-1/2 w-1/2" />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
