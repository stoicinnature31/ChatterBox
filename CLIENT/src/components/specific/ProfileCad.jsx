import { Avatar, colors, Stack, Typography } from "@mui/material";
import {
  Description,
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import React from "react";
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={"1.2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: "9rem",
          height: "9rem",
          borderRadius: "50%",
          border: "2px solid #2F95D8",
          objectFit: "contain",
          marginBottom: "1rem",
        }}
      />
      <ProfileCard heading={"Bio"} text={"Sleeping"} Icon={<Description/>} />
      <ProfileCard
        heading={"Username"}
        text={"@Rajdip"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Rajdip"} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment('2024-07-13T16:55:36.205Z').fromNow()} Icon={<CalendarIcon />} />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"0.5rem"}
    color={"white"}
    textAlign={"center"}>
    {Icon && Icon}

    <Stack
    sx={{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      gap:"1rem"
    }}>
      <Typography variant="body1" color={"aliceblue"} fontWeight={"bold"}>
        {heading}
      </Typography>
      <Typography variant="caption" color={"blue"}>
        {text}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
