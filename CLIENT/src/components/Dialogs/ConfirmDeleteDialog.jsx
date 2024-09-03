import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete Dialog Box</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you wanna delete this group?</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button color='error' onClick={deleteHandler}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog
