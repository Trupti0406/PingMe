import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { appendMessage } from "../redux/messageSlice";
import { useSocket } from "../context/SocketContext"; // Use socket from context

const useGetRealTimeMessage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        console.log("Received new message: ", newMessage);
        // Dispatch the action to append the new message
        dispatch(appendMessage(newMessage));
      });

      return () => socket.off("newMessage");
    }
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;
