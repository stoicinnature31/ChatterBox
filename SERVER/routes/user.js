import express from "express";
import { acceptFriendRequest, getAllNotifications, getMyFriends, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/user.js";
import { acceptFriendRequestValidator, loginValidator, registerValidator, sendFriendRequestValidator, validateHandler } from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";

const app = express.Router();

app.post("/register", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

//User must be logged in to access routes
app.use(isAuthenticated);

app.get("/profile", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);

app.put("/sendrequest", sendFriendRequestValidator(), validateHandler, sendFriendRequest);
app.put("/acceptrequest", acceptFriendRequestValidator(), validateHandler, acceptFriendRequest);


app.get("/notifications", getAllNotifications);
app.get("/friends", getMyFriends);
export default app;
