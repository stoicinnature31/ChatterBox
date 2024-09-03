import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import Table from '../../components/Shared/Table'
import { Avatar } from '@mui/material'
import { dashBoardData } from '../../constants/sampleData'
import { transformImage } from '../../library/features'

const columns = [
  {
    field: "id",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: "200",
  },

  {
    field: "avatar",
    headerName: "ID",
    headerClassName: "table-header",
    width: "150",
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: "150",
  },
  {
    field: "username",
    headerName: "UserName",
    headerClassName: "table-header",
    width: "200",
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: "150",
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: "200",
  },
]
const UserManagement = () => {
  const [rows, setRows] = useState();
  useEffect(() => {
    setRows(dashBoardData.users.map((i) => ({ ...i, id: i._id, avatar: transformImage(i.avatar, 50) })))
  }, []);
  return (
    <Table heading={"All Users"} columns={columns} rows={rows} />
  )
}

export default UserManagement