import React from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings, Group, GroupAddRounded, MessageRounded, Notifications, Person } from '@mui/icons-material'
import moment from 'moment'
import { SearchField } from '../../components/Styles/StyledComponents'
import { blue } from '../../constants/color'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'

const DashBoard = () => {


  const Appbar = (
    <Paper elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}>


      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings sx={{ fontSize: "3rem" }} />

        <SearchField />

        <Button variant='contained'>search</Button>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={blue}
          textAlign={"center"}
        >{moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <Notifications />
      </Stack>
    </Paper>
  )

  //Widgets

  const Widgets =
    <Stack direction={{ xs: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"} spacing={2} sx={{ padding: "2rem 0" }}>
      <Widget title={"Users"} value={31} Icon={<Person />} />
      <Widget title={"Chats"} value={1} Icon={<GroupAddRounded />} />
      <Widget title={"messages"} value={311} Icon={<MessageRounded />} />
    </Stack>




  return (
    <AdminLayout>
      <Container component={"main"}>

        {
          Appbar
        }

        <Stack direction={{
          xs: "column",
          sm: "row",
        }}
          gap={"2rem"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}>

          {/* LineChart */}
          <Paper
            elevation={3}
            sx={{
              padding: "2rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              bgcolor: "aliceblue",
            }}>
            <Typography variant='h5'>Last Messages</Typography>

            <LineChart value={[50,5,30,20,35,25,100]} />
          </Paper>

          {/* DoughNutChart */}
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: { xs: "100%", sm: "50%" },
              maxWidth: "25rem",
              bgcolor: "aliceblue",
            }}>
            <DoughnutChart value={[40, 35, 25]} labels={["Single Chat", "Group Chats", "Community Chats"]} />

            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
              marginTop={"2rem"}>
              <Group /> <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>

        </Stack>

        {
          Widgets
        }
      </Container>
    </AdminLayout>
  )
}

const Widget = ({ title, value, Icon }) =>
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
      bgcolor: "aliceblue",
    }}>
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: blue,
          borderRadius: "50%",
          border: `5px solid ${blue}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem"
        }}>{value}</Typography>
      <Stack direction={"row"} justifyContent="center" alignItems={"center"} spacing={"1rem"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>

export default DashBoard
