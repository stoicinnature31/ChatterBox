import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../Shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";

const Search = () => {
  const search = useInputValidation("");
  const addFriendHandler = (id) => {
    console.log(id);
  };
  const isLoadingSendFriendrequest = false;

  const [users, setUsers] = useState(sampleUsers);

  return (
    <Dialog open>
      <Stack
        p={"2rem"}
        direction={"column"}
        width={"25rem"}
        sx={{
          background: "linear-gradient(180deg, #1089D3, #AFC4DF)",
        }}>
        <DialogTitle textAlign={"center"} fontWeight={"bold"}>
          Find People
        </DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendrequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
