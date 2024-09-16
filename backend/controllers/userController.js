import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // Validate fields
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username already exists, try a different one!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Assign profile photo based on gender
    let profilePhoto = "";
    const malePfp = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femalePfp = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const ratherNotSayPfp = `https://avatar.iran.liara.run/username?username=${userName}`;

    if (gender === "Male") {
      profilePhoto = malePfp;
    } else if (gender === "Female") {
      profilePhoto = femalePfp;
    } else if (gender === "Rather not say") {
      profilePhoto = ratherNotSayPfp;
    }

    // Create the user in the database
    await User.create({
      fullName,
      userName,
      password: hashedPassword,
      profilePhoto,
      gender,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully!", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Both fields are required!", success: false });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect  username or password!",
        success: false,
      });
    }
    //match the password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ message: "Password is incorrect!", success: false });
    }
    const tokenData = {
      userID: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User logged out successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
