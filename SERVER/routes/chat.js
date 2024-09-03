import express from "express";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, deleteChatValidator, getChatDetailsValidator, getMessageValidator, leaveGroupValidator, newGroupValidator, removeMemberValidator, renameGroupValidator, sendAttachmentValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

//User must be logged in to access routes
app.use(isAuthenticated);

app.post("/newChat", newGroupValidator(), validateHandler, newGroupChat);
app.get("/myChat", getMyChats);
app.get("/myChat/myGroups", getMyGroups);
app.put("/addMembers", addMemberValidator(), validateHandler, addMembers);
app.put("/removeMembers", removeMemberValidator(), validateHandler, removeMembers);

app.delete("/leave/:id", leaveGroupValidator(), validateHandler, leaveGroup);

//Send Attachments
app.post("/message", attachmentsMulter, sendAttachmentValidator(), validateHandler, sendAttachments);

//Get Messages
app.get("/message/:id", getMessageValidator(), validateHandler, getMessages);

//get Chat details, rename, delete
app.route("/:id")
  .get(getChatDetailsValidator(), validateHandler, getChatDetails)
  .put(renameGroupValidator(), validateHandler, renameGroup)
  .delete(deleteChatValidator(), validateHandler, deleteChat);

export default app;
