import { Avatar, Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import RenderAttachment from '../../components/Shared/RenderAttachment';
import Table from '../../components/Shared/Table';
import { dashBoardData } from '../../constants/sampleData';
import { fileFormat, transformImage } from '../../library/features';

const columns = [
  {
    field: 'id',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'attachments',
    headerName: 'Attachments',
    headerClassName: 'table-header',
    width: 300,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0 ? (
        <Stack direction={"row"} spacing={2}>
          {attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box key={url}>
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'black',
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}
        </Stack>
      ) : (
        <Typography>No Attachments</Typography>
      );
    },
  },
  {
    field: 'content',
    headerName: 'Content',
    headerClassName: 'table-header',
    width: 400,
  },
  {
    field: 'sender',
    headerName: 'Sent By',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (
      <Stack direction="row" spacing="1rem" alignItems="center">
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: 'chat',
    headerName: 'Chat',
    headerClassName: 'table-header',
    width: 220,
  },
  {
    field: 'groupChat',
    headerName: 'Group Chat',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'createdAt',
    headerName: 'Time',
    headerClassName: 'table-header',
    width: 250,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashBoardData.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format('MMMM Do YYYY'),
      }))
    );
  }, []);



  return (

    <Table
      heading="All Messages"
      columns={columns}
      rows={rows}
    />

  );
};

export default MessageManagement;
