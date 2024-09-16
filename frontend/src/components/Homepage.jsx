import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";

const Homepage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  // console.log("homepage");
  return (
    <div className="flex h-[100vh] md:h-[80vh] w-full max-w-screen-xl border-red-600 shadow-xl bg-white mx-auto">
      <div
        className={`${
          selectedUser ? "hidden" : "block"
        } w-full lg:w-80 h-full bg-gray-200 lg:flex flex-col`}>
        <Sidebar onSelectUser={setSelectedUser} />
      </div>

      {/* For mobile screens (when a user is selected) show ChatContainer */}
      <div
        className={`${
          selectedUser ? "block" : "hidden"
        } w-full lg:block lg:flex-1 h-full bg-white`}>
        <ChatContainer
          selectedUser={selectedUser}
          onBack={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
};

export default Homepage;
