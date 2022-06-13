import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useState } from "react"
import { Grid, IconButton, TextField } from "@mui/material"
import { API } from "./../../axios"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {
  PUSH_FETCHED_DATA,
  PUSH_FETCHED_USERS_DATA,
  SET_FEEDBACK,
  SET_USER_FEEDBACK,
  UPDATE_FETCHED_DATA,
  UPDATE_FETCHED_USERS_DATA,
} from "../../store/constants"
import { useEffect } from "react"

function AddEditUserDialog({
  classes,
  title,
  button,
  buttonStyle,
  iconButton = true,
  userData,
}) {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [userFormData, setUserFormData] = useState()

  // Update form when title change
  useEffect(() => {
    setUserFormData({
      _id: userData?._id || "",
      username: userData?.username || "",
      email: userData?.email || "",
      password: "1111",

      cin: userData?.cin || "",
      phone: userData?.phone || "",
      specialty: userData?.specialty || "",
      rank: userData?.rank || "",
      class: userData?.class || "",

      description: userData?.description || "",

      privilege: title.split(" ").pop(),
    })
  }, [title])

  // Handles
  const handleAddEditUser = async () => {
    try {
      let createdUser = (await API.put(`/user/addEditUser`, userFormData)).data
      // Edit
      if (userData) {
        dispatch({
          type: UPDATE_FETCHED_DATA,
          payload: { scheme: "fetchedUsersData", ...userFormData },
        })
        dispatch({
          type: SET_FEEDBACK,
          payload: "User has been updated : " + userFormData.username,
        })
        return handleClose()
      }
      // Add
      dispatch({
        type: PUSH_FETCHED_DATA,
        payload: { scheme: "fetchedUsersData", ...createdUser },
      })
      dispatch({
        type: SET_FEEDBACK,
        payload: "New user has been added : " + userFormData.username,
      })
      handleClose()
    } catch (error) {
      setFeedback(error.response.data)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  if (!userFormData) return <></>
  return (
    <div
      style={{ display: "inline", ...buttonStyle }}
      // onClick={(event) => {
      //   event.stopPropagation()
      // }}
    >
      {iconButton ? (
        <IconButton onClick={handleClickOpen}>{button}</IconButton>
      ) : (
        <Button onClick={handleClickOpen}>{button}</Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <div style={{ padding: "1rem" }}>
          <DialogTitle style={{ paddingLeft: "0" }}>{title}</DialogTitle>
          <Grid container spacing={3}>
            {title.split(" ").pop() === "Teacher" ? (
              <>
                {inputRender("username")}
                {inputRender("password")}
                {inputRender("cin")}
                {inputRender("phone")}
                {inputRender("email")}
                {inputRender("specialty")}
                {inputRender("rank")}
                {inputRender("description")}
              </>
            ) : (
              <>
                {inputRender("username")}
                {inputRender("password")}
                {inputRender("cin")}
                {inputRender("phone")}
                {inputRender("email")}
                {inputRender("class")}
              </>
            )}
            {inputRender("privilege", true)}
            <Grid item xs={12}>
              <p style={{ color: "red" }}>{feedback} </p>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleAddEditUser}>{title.split(" ")[0]}</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )

  function inputRender(value, disabled) {
    return (
      <Grid item xs={6}>
        <TextField
          disabled={disabled}
          fullWidth
          name={value}
          label={capitalizeFirstLetter(value)}
          value={userFormData[value]}
          onChange={(e) =>
            setUserFormData({ ...userFormData, [value]: e.target.value })
          }
        />
      </Grid>
    )
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export default AddEditUserDialog
