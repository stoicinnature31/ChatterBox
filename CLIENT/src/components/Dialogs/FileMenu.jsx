import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({ anchorE1 }) => {
    return (
        <Menu open ={false} anchorE1={anchorE1}>
            <div style={{
                width: "10rem",
            }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus recusandae optio aperiam doloribus distinctio assumenda ex provident dolorum iure maxime ad eum, minima commodi repellat asper
            </div>
        </Menu>
    )
}

export default FileMenu
