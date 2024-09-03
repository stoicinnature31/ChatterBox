import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from '@mui/icons-material'
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { blue, grey } from '../constants/color'
import { Link } from "../components/Styles/StyledComponents"
import Avatarcard from '../components/Shared/Avatarcard'
import { sampleChats, sampleUsers } from '../constants/sampleData'
import UserItem from '../components/Shared/UserItem'

const Groups = () => {
  //importing ConfirmDeleteDialog by lazy
  const ConfirmDeleteDialog = lazy(() => import("../components/Dialogs/ConfirmDeleteDialog"))

  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('group');


  const navigate = useNavigate()

  const navigateback = () => { navigate("/") };
  console.log(chatId);


  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  }
  const handleMobileClose = () => {
    setIsMobileOpen(false);
  }



  const IconBtns = <>

    <Box
      sx={{
        display: {
          xs: 'block',
          sm: "none",
          position: "fixed",
          right: "1rem",
          top: "2rem",
        },
      }}>
      <IconButton onClick={handleMobile}>
        <Menu />
      </IconButton>
    </Box>

    <Tooltip title="back">
      <IconButton
        onClick={navigateback}
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: blue,
          color: "white",
          "&:hover": {
            bgcolor: "secondary.dark",
          }
        }}>
        <KeyboardBackspace />
      </IconButton>
    </Tooltip>
  </>






  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const updateGroupName = () => {
    setIsEdit(false)
    console.log(groupNameUpdatedValue);
  }

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`)
      setGroupNameUpdatedValue(`Group Name ${chatId}`)
    }

    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }

  }, [chatId]);

  const GroupName =
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"1rem"}>
      {isEdit ?

        (<>
          <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupName}>
            <Done />
          </IconButton>
        </>) :

        (<><Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton></>)}
    </Stack>


  // ButtonGroup

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const openAddMemberHandler = () => { console.log("Add Members") };

  const openConfirmDeleteHandler = () => {
    console.log("Delete Group")
    setConfirmDeleteDialog(true)
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  };



  const ButtonGroup = <Stack direction={{
    xs: "column-reverse",
    sm: "row",
  }}
    spacing={"1rem"}
    padding={{
      xs: "0",
      sm: "1rem",
      md: "1rem 4rem",
    }}
    margin={"1rem auto"}
  >

    <Button size='large' startIcon={<Add />} sx={{
      bgcolor: "primary.light",
      color: "white",
      "&:hover": {
        bgcolor: "primary.main",
      }
    }} onClick={openAddMemberHandler}>Add Members</Button>

    <Button size='large' startIcon={<Delete />} sx={{
      bgcolor: "error.light",
      color: "white",
      "&:hover": {
        bgcolor: "error.main",
      }
    }} onClick={openConfirmDeleteHandler}>Delete Group</Button>
  </Stack>

  // Delete Handler function
  const deleteHandler = () => {
    console.log("Delete Handler");
    closeConfirmDeleteHandler();
  }

  //Members

  const isAddmembers = false;
  const AddMemberDialog = lazy(() => import("../components/Dialogs/AddMemberDialog"))

  //Remove  Member Handler

  const removeMemberhandler = (id) => {
    console.log("Remove Member Handler", id);
  };





  return (
    <Grid container height={"100vh"}>

      <Grid item
        sx={{
          bgcolor: "aliceblue",
          display: {
            xs: "none",
            sm: "block"
          },
        }}
        sm={4}
        overflow={"auto"}
        height={"100vh"}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid item
        xs={12}
        sm={8}
        sx={{
          bgcolor: grey,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}>
        {IconBtns}



        {groupName && <>




          {GroupName}

          <Typography margin={"2rem"} variant='body1'>Members</Typography>
          <Stack direction={"column"}
            maxWidth={"45rem"}
            width={"100%"}
            boxSizing={"border-box"}
            padding={{
              sm: "1rem",
              xs: "0",
              md: "1rem 4rem",
            }}
            bgcolor={"aliceblue"}
            height={"50vh"}
            overflow={"auto"}>
            {/* Members */}
            {
              sampleUsers.map((i) => (
                <UserItem user={i} key={i._id} isAdded styling={{
                  padding: "1rem 2rem",
                  borderRadius: "0.5rem"
                }}
                  handler={removeMemberhandler} />
              ))
            }
          </Stack>

          {ButtonGroup}

        </>}

      </Grid>

      {
        isAddmembers && (<Suspense fallback={<Backdrop open />}><AddMemberDialog /></Suspense>)
      }


      {
        confirmDeleteDialog && (<Suspense fallback={<Backdrop open />}> <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} /></Suspense>)
      }

      <Drawer sx={{
        display: {
          xs: "block",
          sm: "none",
        },
      }} open={isMobileOpen} onClose={handleMobileClose}>
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>

    </Grid >
  )
};


const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? myGroups.map((group) => <GroupsListItem group={group} chatId={chatId} key={group._id} />) : <Typography textAlign={"center"} padding={"1rem"}>No Groups</Typography>}
  </Stack>
);



const GroupsListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group=${_id}`} onClick={(e) => { if (chatId === _id) e.preventDefault(); }}>
      <Stack
        direction={'row'}
        border={'none'}
        justifyContent={'space-between'}
        spacing={'2rem'}
        alignItems={'center'}
        margin={' 0.1rem auto'}
        padding={'0.8rem'}
        bgcolor={'#8dd0fc'}
        color={blue}
      >
        <Avatarcard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups
