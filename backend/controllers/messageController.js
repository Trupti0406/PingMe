import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../index.js";

// Multer File Upload configuration:
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads"); // Adjust path to use __dirname
    cb(null, uploadDir); // Upload directory is now under "backend/uploads"
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid file name conflicts
  },
});

// Initialize upload variable with file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 }, // 50MB file limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file"); // Single file upload, expecting the field name 'file'

// Check for file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images or PDFs Only!");
  }
}

export const sendMessage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    const file = req.file; // Accessing the uploaded file

    // Check if either a message or a file is provided
    if (!message && !file) {
      return res
        .status(400)
        .json({ message: "Message content or file is required" });
    }

    try {
      // Check if a conversation exists between the two users
      let gotConversations = await Conversation.findOne({
        participants: {
          $all: [senderId, receiverId],
        },
      });

      // Create a new conversation if none exists
      if (!gotConversations) {
        gotConversations = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      // Create a new message
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message: message || "", // Optional message
        file: file ? `uploads/${file.filename}` : null, // File path if uploaded
        fileType: file ? file.mimetype.split("/")[1] : null, // Store file type
      });

      // Add the new message to the conversation
      if (newMessage) {
        gotConversations.messages.push(newMessage._id);
      }

      await Promise.all([gotConversations.save(), newMessage.save()]);

      // Socket.io notification
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      return res.status(201).json({
        newMessage,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error sending message" });
    }
  });
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    return res.status(200).json(conversation?.messages);
    // console.log(conversation);
  } catch (error) {
    console.log(error);
  }
};
