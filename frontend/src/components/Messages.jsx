import React from "react";
import { SingleMessage } from "./SingleMessage";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import STARTCONVERSATION from "../images/start-conversation.svg";
const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);

  // Ensure messages is an array
  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col">
        <img
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96"
          src={STARTCONVERSATION}
          alt="illustration to start conversation"
        />

        {/* Responsive Text */}
        <p className="text-lg sm:text-xl md:text-2xl font-semibold  text-center">
          Start conversation with {selectedUser.fullName} now!
        </p>
      </div>
    );
  }

  return (
    <>
      {messages.map((message) => (
        <SingleMessage key={message?._id} message={message} />
      ))}
    </>
  );
};

export default Messages;
