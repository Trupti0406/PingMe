import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllUsers } from "../redux/userSlice";

const useGetAllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user`
        );
        // console.log(res);
        //store in redux store
        dispatch(setAllUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);
};

export default useGetAllUsers;
