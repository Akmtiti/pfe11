import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useDispatch } from "react-redux"
import { IconButton, Tooltip } from "@mui/material"
import { feedbackError, feedbackSuccess } from "../store/actions/feedback"

export default function ConfirmDialog({
  action,
  actionFn,
  schemeName,
  children,
}) {
  /* #region  Open Close */
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  /* #endregion */

  const dispatch = useDispatch()
  const handleAction = async () => {
    try {
      dispatch(actionFn)
      dispatch(
        feedbackSuccess(`${schemeName} has been ${capitalizeFirstLetter(action)}d`)
      )
      handleClose()
    } catch (error) {
      dispatch(
        feedbackError(error?.response?.data)
      )


    }
  }

  return (
    <div>
      <Tooltip title={capitalizeFirstLetter(action)}>
        <IconButton variant="contained" onClick={handleClickOpen}>
          {children}
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {capitalizeFirstLetter(action)} a {schemeName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Are you sure to {action} this {schemeName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAction}>
            {capitalizeFirstLetter(action)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
