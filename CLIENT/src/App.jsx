import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/Auth/ProtectRoute.jsx";
import Loaders from "./components/Layout/Loaders.jsx";
import "./App.css"

const Home = lazy(() => import("./pages/Home.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Groups = lazy(() => import("./pages/Groups.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin/AdminLogin.jsx"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard.jsx"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement.jsx"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement.jsx"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement.jsx"));

const user = true;
export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loaders/>}>
        <Routes>

          <Route element={<ProtectRoute user={user}/>}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          
          {/* ProtectRoute  to be taken care later */}
          <Route path="/login" element={/*<ProtectRoute user={!user} redirect="/">*/<Login />/*</ProtectRoute>}*/} />
          
          {/* Admin Login  Route */}
          <Route path="/admin" element={<AdminLogin />} />
          {/* Dashboard path */}
          <Route path="/admin/dashboard" element={<DashBoard />} />
          {/* UserManagement path */}
          <Route path="/admin/users" element={<UserManagement />} />
          {/* ChatManagement path */}
          <Route path="/admin/chats" element={<ChatManagement />} />
          {/* Messages path */}
          <Route path="/admin/messages" element={<MessageManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
