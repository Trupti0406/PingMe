import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import PDF from "../images/PDF.png";
export const SingleMessage = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formattedTime = message?.createdAt
    ? format(new Date(message.createdAt), "p")
    : "Time not available";

  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?._id === message?.senderId ? "chat-end" : "chat-start"
      }`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Avatar"
            src={
              authUser?._id === message?.senderId
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">{formattedTime}</time>
      </div>
      {/* Conditionally render the message in the chat bubble */}
      {message?.message && (
        <div
          className={`chat-bubble ${
            authUser?._id === message?.senderId
              ? "bg-purple-300 text-black"
              : "bg-slate-200 text-black"
          }`}>
          {message?.message}
        </div>
      )}

      {/* Conditionally render the image without a bubble */}
      {message?.file && (
        <div className="mt-2">
          {message?.fileType === "pdf" ? (
            <div className="relative flex flex-col items-center">
              <div className="w-40 h-52 bg-gray-200 flex items-center justify-center rounded-md">
                <img src={PDF} alt="" className="h-36 " />
              </div>
              <a
                rel="noreferrer"
                target="_blank"
                href={`${process.env.REACT_APP_SOCKET_URL}/${message.file}`}
                className="absolute text-blue-500 mt-2 text-center"
                style={{
                  top: "88%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}>
                View PDF
              </a>
            </div>
          ) : (
            <img
              src={`${process.env.REACT_APP_SOCKET_URL}/${message.file}`}
              alt="Sent"
              className="max-w-xs rounded"
            />
          )}
        </div>
      )}
    </div>
  );
};
