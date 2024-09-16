import Signup from "./components/Signup";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { SocketProvider } from "./context/SocketContext";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import Footer from "./components/Footer";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<Homepage />} />, // Protect the homepage
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);

  return (
    <SocketProvider authUser={authUser}>
      <div className="h-screen flex items-center justify-center bg-base-200">
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Footer />
    </SocketProvider>
  );
}

export default App;
