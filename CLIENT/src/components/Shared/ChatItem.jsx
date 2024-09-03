import React, { memo } from "react";
import { Link } from "../Styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import Avatarcard from "./Avatarcard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: sameSender ? "10px" : "10px",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "#1089D3" : "black",
          position: "relative",
          fontWeight: "bold",
          borderBottom: "2px solid #1089D3",
        }}>
        <Avatarcard avatar={avatar}/>
        <Stack sx={{ padding: "10px" }}>
          <Typography
            sx={{
              fontSize: "1.2rem",
            }}>
            {name}
          </Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Messages</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "0.5rem",
              height: "0.5rem",
              borderRadius: "50%",
              backgroundColor: "blue",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
