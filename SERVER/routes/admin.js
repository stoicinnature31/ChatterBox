import express from 'express'
import { adminLogin, adminLogout, allChats, allmessages, allUsers, getAdminData, getDashBoardStats } from '../controllers/admin.js';
import { adminLoginValidator, validateHandler } from '../lib/validators.js';
import { isAdmin } from '../middlewares/auth.js';

const app = express.Router();



app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);
app.get("/logout", adminLogout);

//Admin can access these routes only
app.use(isAdmin)
app.get("/", getAdminData);
app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allmessages);
app.get("/stats", getDashBoardStats);


export default app;