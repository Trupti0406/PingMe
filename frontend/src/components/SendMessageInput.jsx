import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
import { ImagePreviewModal } from "./ImagePreviewModal"; // Import the modal component

export const SendMessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // State to handle file uploads
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onFileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    setIsModalOpen(true); // Open modal when a file is selected
  };

  const onSubmitHandler = async (e) => {
    if (e) e.preventDefault(); // Check if event exists
    if (!selectedUser?._id) {
      console.log("No user selected");
      return;
    }

    const formData = new FormData();
    formData.append("message", message || ""); // If no message, send an empty string
    if (file) formData.append("file", file);

    // Log the FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value); // Check the file and message content
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/message/send/${selectedUser?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
      setFile(null); // Clear file input after sending the message
      setIsModalOpen(false); // Close modal after sending the message
    } catch (error) {
      console.log(error.response?.data || error.message); // Log detailed error
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="input-bar p-3 flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered w-full pr-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={onFileChangeHandler}
          />
          <label
            htmlFor="file-upload"
            className="absolute inset-y-0 right-0 pr-12 flex items-center cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-purple-400 hover:text-purple-600 transition-colors">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                fill="currentColor"></path>
            </svg>
          </label>

          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-purple-400 hover:text-purple-600 transition-colors">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 10L11 13"
              />
            </svg>
          </button>
        </div>
      </form>
      {/* Modal */}
      <ImagePreviewModal
        file={file}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSend={onSubmitHandler} // Send the file when the button is clicked
      />
    </div>
  );
};
