import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken'
import { cookieOptions } from '../utils/features.js'
import { adminSecretKey } from "../app.js";


// Admin Login
const adminLogin = TryCatch(async (req, res, next) => {

    const { secretKey } = req.body;



    // const adminSecretKey = process.env.ADMIN_SECRET_KEY || "rajdip";

    const isMatch = secretKey === adminSecretKey;

    if (!isMatch) return next(new ErrorHandler("Invalid Admin Key", 401));

    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    return res.status(200).cookie("chat-app-admin-token", token, { ...cookieOptions, maxAge: 1000 * 60 * 15 }).json({
        success: true,
        message: "Admin logged in successfully",
    })

})

//All Users
const allUsers = TryCatch(async (req, res) => {
    const users = await User.find({})

    const transformedUsers = await Promise.all(
        users.map(async ({ name, username, avatar, _id }) => {

            const [groups, friends] = await Promise.all([
                Chat.countDocuments({ groupChat: true, members: _id }),
                Chat.countDocuments({ groupChat: false, members: _id }),
            ])

            return {
                name,
                username,
                avatar: avatar.url,
                _id,
                groups,
                friends,
            }
        })
    )


    return res.status(200).json({
        status: 'success',
        users: transformedUsers,
    })
})

//AllChats
const allChats = TryCatch(async (req, res) => {

    const chats = await Chat.find({})
        .populate("members", "name avatar")
        .populate("creator", " name avatar");


    const transformedChats = await Promise.all(
        chats.map(async ({ members, _id, groupChat, name, creator }) => {


            const totalMessages = await Message.countDocuments({ chat: _id });

            return {
                _id,
                groupChat,
                name,
                avatar: members.slice(0, 3).map((member) => member.avatar.url),
                members: members.map(({ _id, name, avatar }) => ({
                    _id,
                    name,
                    avatar: avatar.url,
                })),
                creator: {
                    name: creator?.name || "None",
                    avatar: creator?.avatar.url || "",
                },
                totalMembers: members.length,
                totalMessages,
            }
        })
    )

    return res.status(200).json({
        status: 'success',
        chats: transformedChats,
    })

})

//Allmessages
const allmessages = TryCatch(async (req, res) => {
    const messages = await Message.find({}).populate("sender", "name avatar")
        .populate("Chat", "groupChat");

    const transformedMessages = messages.map(({ content, attachments, _id, sender, createdAt, Chat }) => ({

        _id,
        attachments,
        content,
        createdAt,
        Chat: Chat ? Chat._id : null,
        groupChat: Chat ? Chat.groupChat : null,
        sender: {
            _id: sender ? sender._id : null,
            name: sender ? sender.name : null,
            avatar: sender && sender.avatar ? sender.avatar.url : null,
        },
    }))

    return res.status(200).json({
        success: true,
        messages: transformedMessages,
    })
})


//DashBoard Stats
const getDashBoardStats = TryCatch(async (req, res) => {
    const [groupsCount, usersCount, messagesCount, totalChatsCount] =
        await Promise.all([
            Chat.countDocuments({ groupChat: true }),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments(),
        ]);

    const today = new Date();
    const last7Days = new Date();

    last7Days.setDate(last7Days.getDate() - 7);
    const last7daysMessages = await Message.find({
        createdAt: {
            $gte: last7Days,
            $lte: today,
        },
    }).select("createdAt")

    const messages = new Array(7).fill(0);

    last7daysMessages.forEach(message => {
        const indexApprox = (today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);
        const index = Math.floor(indexApprox);

        messages[6 - index]++;
    });

    const stats = {
        groupsCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChart: messages,
    };



    return res.status(200).json({
        success: true,
        stats,
    })
})


//Get Admin Data
const getAdminData = TryCatch(async (req, res, next) => {

    return res.status(200).json({
        admmin: true,
        message: "Route Accessesed by admin",
    })
})



// Admin Logout
const adminLogout = TryCatch(async (req, res, next) => {



    return res.status(200).cookie("chat-app-admin-token", "", { ...cookieOptions, maxAge: 0 }).json({
        success: true,
        message: "Admin logged out successfully",
    })

})



export { adminLogin, allUsers, allChats, allmessages, getDashBoardStats, getAdminData, adminLogout }