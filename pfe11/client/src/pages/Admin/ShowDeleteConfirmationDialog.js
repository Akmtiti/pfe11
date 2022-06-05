import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useState } from "react"
import { IconButton } from "@mui/material"
import { PULL_FETCHED_DATA, PULL_FETCHED_USERS_DATA, SET_FEEDBACK, SET_USER_FEEDBACK } from "../../store/actions"
import { useDispatch } from "react-redux"
import { Axios } from "../../axios"

export default function ShowConfirmationDialog({
  classes,
  title = "Supprimer un post",
  description = "Êtes vous sur de vouloir supprimer ce post ?",
  button,
  userToDelete,
  iconButton = true,
}) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleDeleteUser = async () => {
    await Axios.delete(`/user/deleteUser/${userToDelete._id}`)
    dispatch({
      type: PULL_FETCHED_DATA,
      payload: { scheme: "fetchedUsersData", ...userToDelete },
    })
    dispatch({
      type: SET_FEEDBACK,
      payload: "User has been deleted : " + userToDelete.username,
    })
    handleClose()
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div
      style={{ display: "inline" }}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      {iconButton ? (
        <IconButton onClick={handleClickOpen}>{button}</IconButton>
      ) : (
        <Button onClick={handleClickOpen}>{button}</Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button onClick={handleDeleteUser}>{title.split(" ")[0]}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
