import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import { useState } from "react"
import {
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { createClass, updateClass } from "../../../store/actions/class"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"

function AddEditClassDialog({ mode }) {
  const dispatch = useDispatch()
  var { selectedRow } = useSelector((state) => state.dataGrid)
  var { branches } = useSelector((state) => state.branch)

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (mode === "Add") selectedRow = null
    setFormData({
      title: selectedRow?.title || "",
      branch: selectedRow?.branch || "",
    })
  }, [selectedRow])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async () => {
    try {
      // Edit
      if (mode === "Edit") {
        await dispatch(updateClass(selectedRow._id, formData))
        await dispatch({
          type: "SET_FEEDBACK_OBJECT",
          payload: {
            feedback: "Modification réussie",
            severity: "success",
          },
        })
      } else {
        // Create
        await dispatch(createClass(formData))
        await dispatch({
          type: "SET_FEEDBACK_OBJECT",
          payload: {
            feedback: "Ajout réussi",
            severity: "success",
          },
        })
      }
    } catch (error) {
      return await dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: {
          feedback: error.response?.data,
          severity: "error",
        },
      })
    }

    setTimeout(() => {
      handleClose()
    }, 1000)
  }

  const handleFormData = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        {mode === "Edit" ? <EditIcon color="success" /> : <AddIcon />}
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {mode === "Edit" ? "Modifier" : "Ajouter"} une classe
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              name="branch"
              select
              label="Branche"
              value={formData.branch}
              onChange={handleFormData}
              fullWidth
            >
              {branches.map((branch) => (
                <MenuItem key={branch._id} value={branch._id}>
                  {branch.title}
                </MenuItem>
              ))}
            </TextField>
            {inputRender({
              name: "title",
              label: "TItre",
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button onClick={onSubmit}>
            {mode === "Edit" ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

  function inputRender(props) {
    return (
      <Grid item xs={6}>
        <TextField
          fullWidth
          label={capitalizeFirstLetter(props.name)}
          value={formData[props.name]}
          onChange={handleFormData}
          {...props}
        />
      </Grid>
    )
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default AddEditClassDialog
