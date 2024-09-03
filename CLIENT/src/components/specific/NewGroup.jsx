import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../Shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setMembers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, isAdded: !user.isAdded } : user
      )
    );

    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  console.log(selectedMembers);

  const submitHandler = () => { };

  const groupName = useInputValidation("");

  const closeHandler = () =>{};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        width={"25rem"}
        sx={{
          background: "linear-gradient(180deg, #1089D3, #AFC4DF)",
        }}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1" padding={"0.5rem 1rem"}>
          Members
        </Typography>

        <Stack>
          {members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} margin={"0.5rem auto"} spacing={"0.9rem"}>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
          <Button color="error" variant="contained" size="large">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
