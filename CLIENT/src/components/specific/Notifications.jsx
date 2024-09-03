import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";

const Notifications = () => {
  const friendRequestHandler = ({ _id, accept }) => {
    console.log(_id, accept);
  };

  return (
    <>
      <Dialog open>
        <Stack
          p={{ xs: "1rem", sm: "2rem" }}
          maxWidth={"50rem"}
          sx={{
            background: "linear-gradient(180deg, #1089D3, #AFC4DF)",
          }}>
          <DialogTitle>Notifications</DialogTitle>

          {sampleNotifications.length > 0 ? (
            sampleNotifications.map((i) => (
              <NotificationItem
                sender={i.sender}
                _id={i._id}
                handler={friendRequestHandler}
                key={i._id}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Notifications</Typography>
          )}
        </Stack>
      </Dialog>
    </>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        bgcolor={"#AFC4DF"}
        padding={"1rem"}
        borderRadius={"0.5rem"}>
        <Avatar src={avatar} />
        <Typography
          variant="caption"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }}>
          <Button
            onClick={() => handler({ _id, accept: true })}
            variant="contained"
            color="primary"
            sx={{ margin: "0.5rem", fontSize: "0.7rem" }}>
            Accept
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ margin: "0.5rem", fontSize: "0.7rem" }}
            onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
