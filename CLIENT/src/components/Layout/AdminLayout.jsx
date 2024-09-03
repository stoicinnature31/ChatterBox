import { Chat, Close, Dashboard, ExitToApp, Group, ManageAccounts, Menu } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom'
import { grey } from '../../constants/color'
import { Link } from '../Styles/StyledComponents'
import { blue } from '../../constants/color'



// const Link = styled(LinkComponent)
//   `text-decoration:none;
//   border-radius:2rem;
//   padding:1rem 2rem;
//   color: black;
//   &:hover {
//   color:rgba(0,0,0,0.54)
//   }
// `


//Admin Tabs
const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccounts />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <Group />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <Chat />,
  },
];

// SideBar
const Sidebar = ({ w = "100%" }) => {

  const location = useLocation()

  // Logout Handler

  const logoutHandler = () =>{}

  return (
    <Stack width={{ w }} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant='h5' textAlign={"center"} textTransform={"uppercase"}>Chat App</Typography>

      <Stack spacing={"1rem"}>
        {
          adminTabs.map((tab) => (
            <Link key={tab.path} to={tab.path}
              sx={
                location.pathname === tab.path && {
                  bgcolor: blue,
                  color: "aliceblue",
                  borderRadius: "2rem",
                }
              }>
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
                <Typography fontSize={"1rem"}>{tab.name}</Typography>
              </Stack>
            </Link>
          ))
        }

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToApp />
            <Typography fontSize={"1rem"} >Log Out</Typography>
          </Stack>
        </Link>


      </Stack>
    </Stack>
  )

}



const isAdmin = true;

const AdminLayout = ({ children }) => {

  const [isMobile, setIsMobile] = useState();

  // HandleMobile
  const handleMobile = () => {
    setIsMobile(!isMobile);
  }
  // handleClose
  const handleClose = () => {
    setIsMobile(false);
  }

  if(!isAdmin) return <Navigate to={"/admin"}/>

  return (
    <Grid container minHeight={"100vh"}>

      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}>
        <IconButton onClick={handleMobile}>{isMobile ? <Close /> : <Menu />}</IconButton>

      </Box>






      <Grid item md={4} lg={3} sx={{
        backgroundColor: grey,
        height: "100vh",
        display: {
          xs: "none",
          md: "block",
        }
      }}>
        <Drawer open={isMobile} onClose={handleClose}>
          <Sidebar w="50vw" />
        </Drawer>
      </Grid>


      <Grid item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "white",
        }}>
        {children}
      </Grid>


    </Grid>
  )
}

export default AdminLayout