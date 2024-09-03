// Create a new user and save it to the Database and save token  in cookie

import { compare } from "bcrypt";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";




// Register or create new user
const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const file = req.file;

  if (!file) return next(new ErrorHandler("Please Upload Avatar", 403));

  // Set the avatar details (you can modify this as needed)
  const avatar = {
    public_id: file.originalname, // Use the original file name or generate a unique ID
    url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}` // Data URL for the image
  };

  // Create a new user
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  // Send response with token
  sendToken(res, user, 201, "User Created Successfully");
});



//Log in
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid UserName!", 404));

  const isMatch = await compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler("Invalid Password!", 404));

  sendToken(res, user, 200, `Welcome Back ${user.name}`);
});
//Profile
const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Logout
const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chat-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

//searchUser
const searchUser = TryCatch(async (req, res) => {
  const name = req.query.name ? String(req.query.name) : "";
  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required" });
  }

  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  });


  //All users from  my chats means People I have chatted with
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  // remove my id from the array
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });
  console.log("allUsersExceptMeAndFriends", allUsersExceptMeAndFriends);

  // Modifying the Response
  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }))

  return res.status(200).json({
    success: true,
    users,
    // allUsersFromMyChats,
    // allUsersExceptMeAndFriends,
  });


});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;




  // Check if a friend request has already been sent or received
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ]
  });

  if (request) {
    return next(new ErrorHandler("Request already sent", 400));
  }

  // Create a new friend request
  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  // Emit the new request event 
  emitEvent(req, NEW_REQUEST, userId);

  // Return success response
  return res.status(200).json({
    success: true,
    message: "Friend request sent successfully",
  });
});

//Accept Friend Request
const acceptFriendRequest = async (req, res, next) => {
  const { requestId, accept } = req.body;

  console.log("Received Request:", requestId, accept);

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  console.log("Request:", request);

  if (!request) {
    console.error("Request not found");
    return next(new ErrorHandler("Request not found", 404));
  }

  console.log("sender:", req.user._id);
  console.log("receiver:", request.receiver._id);

  if (!request.receiver) {
    console.error("Request receiver not found");
    return next(new ErrorHandler("Receiver not found", 404));
  }

  if (request.receiver._id?.toString() !== req.user?.toString()) {
    console.error("Authorization failed");
    return next(new ErrorHandler("You are not Authorized to accept this request", 401));
  }

  if (!accept) {
    await request.deleteOne();
    console.log("Friend Request Rejected");

    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  console.log("Members to be added to chat:", members);

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} - ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  console.log("Chat created and request deleted");

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted",
    senderId: request.sender._id,
  });
};



//Notifications
const getAllNotifications = TryCatch(async (req, res, next) => {


  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar",
  );

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      name: sender.name,
      avatar: sender.avatar.url,
      _id: sender._id,
    }
  }));

  return res.status(200).json({
    success: true,
    requests: allRequests,
  })
})


//Friends
const getMyFriends = TryCatch(async (req, res, next) => {


  const chatId = req.query.chatId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);

    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    }
  })


  if (chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter(
      (friends) => !chat.members.includes(friend._id)
    )

    return res.status(200).json({
      success: true,
      friends: availableFriends,
    })
  }
  else {
    return res.status(200).json({
      success: true,
      friends,
    })
  }
})


export { acceptFriendRequest, getAllNotifications, getMyFriends, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest };

