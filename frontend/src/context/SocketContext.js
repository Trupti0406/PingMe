// socketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "../redux/userSlice";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, authUser }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const newSocket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
        query: { userId: authUser._id },
      });
      setSocket(newSocket);
      // Listen for online users from server
      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      // Clean up on unmount or user logout
      return () => {
        newSocket.close();
        setSocket(null);
      };
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
