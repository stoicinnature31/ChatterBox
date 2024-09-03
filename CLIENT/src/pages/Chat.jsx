import { AttachFile, CurrencyRupee, Send } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import React, { useRef } from 'react';
import FileMenu from '../components/Dialogs/FileMenu';
import AppLayout from '../components/Layout/AppLayout';
import MessageComponent from '../components/Shared/MessageComponent';
import { InputBox } from '../components/Styles/StyledComponents';
import { blue, grey } from '../constants/color';
import { SampleMessage } from '../constants/sampleData';

const Chat = () => {

  const containerRef = useRef(null);

  const user = {
    _id: "kjnfjiewfnewj",
    name: 'Rajdip',
  }

  const fileMenuRef = useRef(null)

  return (
    <>
      <Stack ref={containerRef} boxSizing={"border-box"} padding={"1rem"} spacing={"1rem"}
        bgcolor={grey}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}>

        {/* Sample messages */}

        {
          SampleMessage.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))
        }
      </Stack>




      <form style={{
        height: "10%",
      }}>
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}
          sx={{
            bgcolor: "white",
            width: "100%",
          }}>

          <IconButton sx={{
            position: "absolute",
            rotate: "30deg",
            marginLeft: "1rem"
          }}
         >
            <AttachFile />
          </IconButton>
          

          <InputBox
          sx={{
            width: "100%",
          }} placeholder='Type messages here...' />
          

          <IconButton type='submit' sx={{
            bgcolor: blue,
            color: "white",
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover": {
              bgcolor: "primary.dark",
              color: "secondary.dark",
            },
          }}><Send />
          </IconButton>
          <IconButton sx={{
            position: "absolute",
            right: "5rem",
            top: "1rem",
            marginLeft: "1rem",
          }}
         >
            <CurrencyRupee />
          </IconButton>
        </Stack>


      </form>

      <FileMenu/>



    </>
  )
}

export default AppLayout()(Chat)
