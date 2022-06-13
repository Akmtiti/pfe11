import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { CardMedia, Stack } from "@mui/material"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TeacherDialog(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        More informations
      </Button>
      <Dialog
        // maxWidth="xl"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle sx={{fontSize : "2rem"}}>{props.teacher.username}</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2}>
            <img style={{ width: "50%", }} src="assets/images/inconnue.jpg" alt="" />

            {/* <CardMedia
              style={{
                width: "auto",
                maxHeight: "300px",
              }}
              component="img"

              image="assets/images/inconnue.jpg"
              alt="Teacher image"
            /> */}
            <DialogContentText sx={{fontSize :"1.5rem"}} >
              Name : {props.teacher.username} <br />
              Phone : {props.teacher.phone} <br />
              Specialty : {props.teacher.specialty} <br />
              Rank : {props.teacher.rank} <br />
              Description : {props.teacher.username} <br />
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
