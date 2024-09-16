import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.userID; // This sets the userID (senderId) in the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

export default isAuthenticated;
