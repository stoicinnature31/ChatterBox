import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = async (uri) => {
  const dbName = "ChatApp"; // Consistent casing
  mongoose
    .connect(uri, { dbName })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((error) => {
      throw error;
    });
};

const sendToken = (res, user, code, message) => {
  // console.log("JWT_SECRET :", process.env.JWT_SECRET);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  console.log("Token:", token);

  return res.status(code).cookie("chat-token", token, cookieOptions).json({
    success: true,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("Emitting Event", event);
};

const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
};
