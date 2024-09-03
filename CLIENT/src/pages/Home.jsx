import React from "react";
import AppLayout from "../components/Layout/AppLayout.jsx";
import { Box, Typography } from "@mui/material";
const Home = () => {
  return (
    <Box>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}
      sx={{
        bgcolor:"#90B8DD",
        height:"100vh",
      }}>Select a friend to chat</Typography>
    </Box>
  );
};

export default AppLayout()(Home);
