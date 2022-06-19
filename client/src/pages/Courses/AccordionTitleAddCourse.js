import * as React from "react"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Button, Collapse, IconButton, Stack, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useDispatch, useSelector } from "react-redux"
import { createCourse } from "../../store/actions/course"

export function AccordionTitleAddCourse({ classe }) {

  const { courses } = useSelector((state) => state.course)
  const dispatch = useDispatch()

  const [formData, setFormData] = React.useState({
    title: "",
    classId: classe._id,
  })
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleEdit = async (e) => {
    e.stopPropagation()
    setFormData({ ...formData, edit: !formData.edit })
  }
  const addCourse = async (e) => {
    e.stopPropagation()

    try {
      let createdCourse = await dispatch(createCourse(formData))
      console.log(createdCourse)
    } catch (error) {
      dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: { feedback: error?.response?.data, severity: "error" },
      })
    }
  }
  return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography>{classe.title}</Typography>{" "}
        <IconButton className="teacherOnly" onClick={toggleEdit}>
          <AddIcon />
        </IconButton>
        <Collapse in={formData.edit}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <TextField
              value={formData.title}
              label="Add course"
              name="title"
              onChange={handleChange}
              onClick={(e) => e.stopPropagation()}
            />
            <Button  variant="contained" onClick={addCourse}>Add course</Button>
          </Stack>
        </Collapse>
      </Stack>
  )
}
