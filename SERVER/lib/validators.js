import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

//Validator Handler
const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg).join(", ")
    console.log(errorMessages);



    if (errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages, 400))

}
//RegisterValidator
const registerValidator = () => [
    body("name", "Please enter name").notEmpty(),
    body("username", "Please enter username").notEmpty(),
    body("bio", "Please enter bio").notEmpty(),
    body("password", "Please enter password").notEmpty(),
];
//loginValidator
const loginValidator = () => [
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
];
//newGroupValidator
const newGroupValidator = () => [
    body("name", "Please enter name").notEmpty(),
    body("members").notEmpty().withMessage("Please enter members").isArray({ min: 2, max: 100 }).withMessage("Members must be between 2-100", 400),
];
//addMemberValidator
const addMemberValidator = () => [
    body("chatId", "Please enter chat Id").notEmpty(),
    body("members").notEmpty().withMessage("Please enter members").isArray({ min: 1, max: 97 }).withMessage("Members must be between 1-97", 400),
];
//removeMemberValidator
const removeMemberValidator = () => [
    body("chatId", "Please enter chat Id").notEmpty(),
    body("userId", "Please enter user Id").notEmpty(),
];
//leaveGroupValidator
const leaveGroupValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
];
//sendAttachmentValidator
const sendAttachmentValidator = () => [
    body("chatId", "Please enter chat Id").notEmpty(),
];

//getMessageValidator
const getMessageValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
];
//getChatDetailsValidator
const getChatDetailsValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
];
//renameGroupValidator
const renameGroupValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
    body("name", "Please enter new name").notEmpty(),
];

//deleteChatValidator
const deleteChatValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
];

// ----------------------User------------------------------------------------

//sendFriendRequestValidator
const sendFriendRequestValidator = () => [
    body("userId", "Please enter User Id").notEmpty(),
]
//acceptFriendRequestValidator
const acceptFriendRequestValidator = () => [
    body("requestId", "Please enter Request Id").notEmpty(),
    body("accept", "Please Accept").notEmpty().isBoolean().withMessage("Accept must be Boolean"),
]



// -----------Admin-----------------

//adminLoginValidator
const adminLoginValidator = () => [
    body("secretKey", "Please enter Secret Key").notEmpty(),
]


export {
    acceptFriendRequestValidator, addMemberValidator, adminLoginValidator, deleteChatValidator, getChatDetailsValidator, getMessageValidator, leaveGroupValidator, loginValidator, newGroupValidator, registerValidator, removeMemberValidator, renameGroupValidator, sendAttachmentValidator, sendFriendRequestValidator, validateHandler
};

