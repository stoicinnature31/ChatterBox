import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import { blue } from "../../../constants/color.js";
import React, { lazy, Suspense } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchDialog = lazy(()=> import("../../specific/Search.jsx"))
const NotificationDialog = lazy(()=> import("../../specific/Notifications.jsx"))
const GroupDialog = lazy(()=> import("../../specific/NewGroup.jsx"))

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const Menuicon = () => {
    setIsMobile((prev) => !prev);
  };
  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const openNotifications = () => {
    setIsNotification((prev) => !prev);
  };
  const navigateToGroup = () => navigate("/groups");

  const LogoutHandler = () => {
    console.log("LogoutHandler");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"} paddingTop={"0"}/* position={"fixed"}  zIndex={"100"}*/ width={"100%"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: blue,
            // opacity:"0.5"
            // marginTop:"0",
          }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}>
              CHAT APP
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}>
              <IconButton color="inherit" onClick={Menuicon}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box>

              <Tooltip title="Search">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={openSearchDialog}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="New Group">
                <IconButton color="inherit" size="large" onClick={openNewGroup}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Manage Groups">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={navigateToGroup}>
                  <GroupIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="NotificationIcon">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={openNotifications}>
                  <NotificationIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="LogOut Icon">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={LogoutHandler}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open/>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open/>}>
          <NotificationDialog/>
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
          <GroupDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;
