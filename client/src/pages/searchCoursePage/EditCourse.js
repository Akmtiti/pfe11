import React, { useState } from "react"
import {
  Button,
  CardMedia,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material"
import { useSelector } from "react-redux"



const folders = ["course", "TD", "TP", "examen"]
function EditCourse() {
  const { courses } = useSelector((state) => state.course)
  const { classes } = useSelector((state) => state.class)
  const [formData, setFormData] = useState({})

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
     <Stack
     spacing={2}
     >
      <TextField
        name="classId"
        select
        label="Class"
        onChange={handleChange}
        fullWidth
      >
        {classes.map((classe) => (
          <MenuItem key={classe._id} value={classe._id}>
            {classe.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        disabled={!formData.classId}
        name="courseId"
        select
        label="Course"
        onChange={handleChange}
        fullWidth
      >
        {courses
          .filter((course) => course.classId === formData.classId)
          .map((course) => (
            <MenuItem key={course._id} value={course._id}>
              {course.title}
            </MenuItem>
          ))}
      </TextField>  
     </Stack>
  )
}

export default EditCourse
