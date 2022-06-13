import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useDispatch } from "react-redux"
import { deletePost } from "../../../../actions/posts"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton } from "@mui/material"
import AcUnitIcon from "@mui/icons-material/AcUnit"


export default function FreezeRowDialog({
  collectionLabel,
   freezeRow,
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
  const handleFreezeRow = async () => {
    handleClickOpen()
    freezeRow()
    // dispatch(deletePost(row._id))
  }

  return (
    <div>
      <IconButton variant="contained" color="error" onClick={handleClickOpen}>
        <AcUnitIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Bloquer un ${collectionLabel}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {` Êtes vous sur de vouloir bloquer ce ${collectionLabel} ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button
            onClick={(event) => {
              handleFreezeRow(event)
            }}
          >
            Bloquer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
