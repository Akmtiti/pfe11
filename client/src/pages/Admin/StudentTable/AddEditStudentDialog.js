import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import { useState } from "react"
import { Grid, IconButton, TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { createStudent, updateStudent } from "../../../store/actions/student"
import SnackbarFeedback from "../../../globalComponents/SnackbarFeedback"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"

function AddEditStudentDialog({ mode }) {
  const dispatch = useDispatch()
  var { selectedRow } = useSelector((state) => state.dataGrid)

  const [open, setOpen] = useState(false)
  const [feedbackObject, setFeedbackObject] = useState({
    feedback: "",
    severity: "",
  })
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (mode === "Add") selectedRow = null
    setFormData({
      username: selectedRow?.username || "",
      email: selectedRow?.email || "",
      password: "1111",

      cin: selectedRow?.cin || "",
      phone: selectedRow?.phone || "",
      class: selectedRow?.class || "",

      description: selectedRow?.description || "",

      privilege: "Student",
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
        await dispatch(updateStudent(selectedRow._id, formData))
        await dispatch({
          type: "SET_FEEDBACK_OBJECT",
          payload: { feedback: "Modification réussie", severity: "success" },
        })
      } else {
        // Create
        await dispatch(createStudent(formData))
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
            {mode === "Edit" ? "Modifier" : "Ajouter"} un élève
          </DialogTitle>
          <Grid container spacing={3}>
            {inputRender({ name: "username", label: "Nom d'utilisateur" })}
            {inputRender({ name: "password", label: "Mot de passe" })}
            {inputRender({ name: "cin", label: "Carte d’identité national" })}
            {inputRender({ name: "phone", label: "Téléphone" })}
            {inputRender({ name: "email", label: "Adresse email" })}
            {inputRender({ name: "class", label: "Classe" })}
            {inputRender({
              name: "privilege",
              label: "Mot de passe",
              disabled: true,
            })}
          </Grid>
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
export default AddEditStudentDialog
