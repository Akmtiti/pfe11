import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import { useState } from "react"
import { DialogContent, Grid, IconButton, Stack, TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { createBranch, updateBranch } from "../../../store/actions/branch"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import ClassChipSelect from "../../../globalComponents/ClassChipSelect"

function AddEditBranchDialog({ mode }) {
  const dispatch = useDispatch()
  var { selectedRow } = useSelector((state) => state.dataGrid)

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (mode === "Add") selectedRow = null
    setFormData({
      title: selectedRow?.title || "",
      classes: selectedRow?.classes || [],
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
        await dispatch(updateBranch(selectedRow._id, formData))
        await dispatch({
          type: "SET_FEEDBACK_OBJECT",
          payload: { feedback: "Modification réussie", severity: "success" },
        })
      } else {
        // Create
        await dispatch(createBranch(formData))
        await dispatch({
          type: "SET_FEEDBACK_OBJECT",
          payload: { feedback: "Ajout réussi", severity: "success" },
        })
      }
    } catch (error) {
      return await dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: { feedback: error.response?.data, severity: "error" },
      })
    }

    setTimeout(() => {
      handleClose()
    }, 1000)
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        {mode === "Edit" ? <EditIcon color="success" /> : <AddIcon />}
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <div style={{ padding: "1rem" }}>
          <DialogTitle style={{ paddingLeft: "0" }}>
            {mode === "Edit" ? "Modifier" : "Ajouter"} une branche
          </DialogTitle>
          <DialogContent>
            <Stack
              sx={{mt : 2}}
              spacing={2}
              >
              {inputRender({ name: "title", label: "Titre" })}
            
              {/* <ClassChipSelect setFormData={setFormData} formData={formData} />   */}
              </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fermer</Button>
            <Button onClick={onSubmit}>
              {mode === "Edit" ? "Modifier" : "Ajouter"}
            </Button>
          </DialogActions>
        </div>
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
          onChange={(e) =>
            setFormData({ ...formData, [props.name]: e.target.value })
          }
          {...props}
        />
      </Grid>
    )
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export default AddEditBranchDialog
