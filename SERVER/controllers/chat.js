import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

// New Group Creation
const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;



  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group chat`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group Chat created successfully",
  });
});

// myChats
const getMyChats = TryCatch(async (req, res, next) => {
  try {
    console.log(`user: ${req.user}`);

    // if (!req.user || !req.user._id) {
    //   return next(new ErrorHandler("User not found", 400));
    // }
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name username avatar"
    );

    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
      const otherMember = getOtherMember(members, req.user);

      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar?.url)
          : [otherMember?.avatar?.url],
        name: groupChat ? name : otherMember?.name || "Unknown",
        members: members.reduce((prev, curr) => {
          if (curr._id !== req.user) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });

    return res.status(200).json({
      success: true,
      chats: transformedChats,
    });
  } catch (error) {
    return next(error);
  }
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ members, _id, groupChat, name }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    groups,
  });
});
//Add Members
const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;
  console.log(members);



  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a Group Chat", 404));
  }

  if (chat.creator?.toString() !== req.user?.toString()) {
    return next(new ErrorHandler("You are not allowed to add members", 403));
  }

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));
  const allNewMembers = await Promise.all(allNewMembersPromise);

  // Check for any invalid user IDs
  const invalidMembers = allNewMembers.filter((user) => user === null);
  if (invalidMembers.length > 0) {
    return next(new ErrorHandler("Some users were not found", 404));
  }

  // Filter out already existing members
  const uniqueMembers = allNewMembers.filter(
    (i) => !chat.members.includes(i._id.toString())
  );

  if (uniqueMembers.length < 1) {
    return next(
      new ErrorHandler("All provided members are already in the group", 400)
    );
  }

  // Add unique members to the group
  chat.members.push(...uniqueMembers.map((i) => i._id));

  if (chat.members.length > 100) {
    return next(new ErrorHandler("Group members limit reached", 400));
  }

  await chat.save();

  const allUsersName = uniqueMembers.map((i) => i.name).join(", ");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} has been added in the group`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

//Remove Members
const removeMembers = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;

  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a Group Chat", 404));
  }

  if (chat.creator?.toString() !== req.user?.toString()) {
    return next(new ErrorHandler("You are not allowed to add members", 403));
  }

  if (chat.members.length < 2)
    return next(new ErrorHandler("Group must have atleast 2 members", 400));

  chat.members = chat.members.filter((i) => i.toString() !== userId.toString());

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved.name} has been removed from the group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    message: "Members removed successfully",
  });
});
//Leave Group
const leaveGroup = TryCatch(async (req, res, next) => {
  const { params, user } = req;
  const chatId = params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a Group Chat", 404));
  }

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== user.toString()
  );

  if (remainingMembers.length < 3) {
    return next(new ErrorHandler("A group must have at least 3 members", 400));
  }

  // If the user leaving is the creator, assign a new creator
  if (chat.creator.toString() === user.toString()) {
    const randomIndex = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomIndex];
    chat.creator = newCreator;
  }

  // Update chat members
  chat.members = remainingMembers;

  const [userData] = await Promise.all([
    User.findById(user, "name"),
    chat.save(),
  ]);

  emitEvent(
    req,
    ALERT,
    chat.members,
    `User ${userData.name} has left the group`
  );

  return res.status(200).json({
    success: true,
    message: `${userData.name} has left the group.`,
  });
});

//Send Attachmments
const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const files = req.files || [];


  if (files.length < 1)
    return next(new ErrorHandler("Please provide an attachment", 400));


  if(files.length > 200) return next(new ErrorHandler("Only 200 files can be sent at a time", 400));


  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));




  //Upload files here
  const attachments = [];

  const messageForDB = {
    content: "",
    attachments,
    sender: me._id,
    Chat: chatId,
  };
  const messageForrealTime = {
    ...messageForDB,
    sender: {
      name: me.name,
      id: me._id.toString(),
    },
  };
  const message = await Message.create(messageForDB);

  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForrealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message,
  });
});

// Chat Details
const getChatDetails = TryCatch(async (req, res,next, user) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

//Rename Group
const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  const { name } = req.body;

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to rename the group", 403)
    );

  chat.name = name;
  await chat.save();

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Group renamed successfully",
  });
});

// Delete Chat
const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const members = chat.members;

  if (chat.groupChat && chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to delete the group", 403)
    );

  if (!chat.groupChat && !chat.members.include(req.user.toString())) {
    return next(
      new ErrorHandler("You are not allowed to delete the chat", 403)
    );
  }

  // Here we have to delete all messages and attachments from cloudinary

  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) =>
    attachments.forEach(({ public_ids }) => public_ids.push(public_id))
  );

  await Promise.all([
    //Delete files from cloudinary
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

//Get messages
const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.chatId;
  const { page = 1 } = req.query;
  const limit = 20;
  const skip = (page - 1) * limit;

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalpages = Math.ceil(totalMessagesCount / limit) || 0;

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalpages,
  });
});

export {
  addMembers, deleteChat, getChatDetails, getMessages, getMyChats,
  getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments
};
