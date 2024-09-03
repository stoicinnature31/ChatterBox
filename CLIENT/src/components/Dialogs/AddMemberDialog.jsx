import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../Shared/UserItem';

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
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


    const addMemberSubmitHandler = () => {
        // Assuming addMember is a function passed as a prop to handle adding members
        addMember(selectedMembers, chatId);
        closeHandler();
    };

    const closeHandler = () => {
        setSelectedMembers([]);
        setMembers([]);
    };

    return (
        <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"25rem"} spacing={"2rem"}>

                <DialogTitle textAlign={"center"}>Add Members</DialogTitle>

                <Stack spacing={"1rem"}>
                    {members.length > 0
                        ? members.map((i) => (
                            <UserItem
                                user={i}
                                key={i._id}
                                handler={selectMemberHandler}
                                isAdded={selectedMembers.includes(i._id)}
                            />
                        ))
                        : <Typography textAlign={"center"}>No Friends</Typography>}
                </Stack>
                <Stack spacing={"1rem"} padding={"1rem"}>
                    <Button color='error' variant='outlined' onClick={closeHandler}>Cancel</Button>
                    <Button variant='contained' disabled={isLoadingAddMember} onClick={addMemberSubmitHandler}>Save</Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export default AddMemberDialog;
