import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Avatarcard from '../../components/Shared/Avatarcard';
import Table from '../../components/Shared/Table';
import { dashBoardData } from '../../constants/sampleData';
import { transformImage } from '../../library/features';

const columns = [
  {
    field: 'id',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'avatar',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => <Avatarcard alt={params.row.name} avatar={params.row.avatar} />,
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 300,
  },
  {
    field: 'totalMembers',
    headerName: 'Total Members',
    headerClassName: 'table-header',
    width: 120,
  },
  {
    field: 'members',
    headerName: 'Members',
    headerClassName: 'table-header',
    width: 400,
    renderCell: (params) => <Avatarcard max={100} avatar={params.row.members} />,
  },
  {
    field: 'totalMessages',
    headerName: 'Total Messages',
    headerClassName: 'table-header',
    width: 120,
  },
  {
    field: 'creator',
    headerName: 'Created By',
    headerClassName: 'table-header',
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing="1rem">
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashBoardData.chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
        members: i.members.map((m) => transformImage(m.avatar, 50)),
        creator: {
          name: i.creator.name,
          avatar: transformImage(i.creator.avatar, 50),
        },
      }))
    );
  }, []);

  return <Table heading="All Chats" columns={columns} rows={rows} />;
};

export default ChatManagement;
