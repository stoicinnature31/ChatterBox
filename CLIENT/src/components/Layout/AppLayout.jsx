import React from "react";
import Header from "./Header/Header.jsx";
import Title from "../Shared/Title.jsx";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList.jsx";
import { sampleChats } from "../../constants/sampleData.js";
import { useParams } from "react-router-dom";
import ProfileCad from "../specific/ProfileCad.jsx";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };

    return (
      <>
        <Title />
        <h1>
          <Header />
        </h1>
        <Grid container height={"calc(100vh - 4rem"} >
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              padding: "0",
              background: "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%)",

            }}
            height={"100vh"}
            overflow={"auto"}>
            
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              //   newMessagesAlert={[
              //     {
              //       chatId,
              //       count: 4,
              //     },
              //   ]}
              // onlineUsers={["1","2"]}
              handleDeleteChat={handleDeleteChat}

            />
          </Grid>

          <Grid item xs={12} sm={8} lg={6} height={"100vh"}>
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            height={"100vh"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              background: "hsla(203, 86%, 45%, 1)",

              background:
                "linear-gradient(90deg, hsla(203, 86%, 45%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)",

              background:
                " -moz-linear-gradient(90deg, hsla(203, 86%, 45%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)",

              background:
                "-webkit-linear-gradient(90deg, hsla(203, 86%, 45%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)",
            }}>
            <ProfileCad />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
