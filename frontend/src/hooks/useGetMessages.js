import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    // Only fetch messages if selectedUser exists
    if (!selectedUser) {
      return;
    }

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true; // Ensure user is logged in
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/message/${selectedUser._id}`
        );
        // console.log(res);
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
