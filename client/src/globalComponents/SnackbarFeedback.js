import * as React from "react"
import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { useSelector } from "react-redux"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert   elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SnackbarFeedback() {
  const { feedbackObject} = useSelector((state) => state.dataGrid)
  
  const [open, setOpen] = React.useState(false)
  
  React.useEffect(() => {
    if (Object.keys(feedbackObject).length === 0) return

    if (feedbackObject?.feedback !== "") handleClick()
  }, [feedbackObject])

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={feedbackObject.severity}
          sx={{ width: "100%" }}
        >
          {feedbackObject.feedback}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
