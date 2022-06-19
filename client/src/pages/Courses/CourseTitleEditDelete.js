import React, { useState } from "react"
import Typography from "@mui/material/Typography"
import { IconButton, Stack, TextField, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useDispatch, useSelector } from "react-redux"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { deleteCourse, updateCourse } from "../../store/actions/course"

export function CourseTitleDelete({ course }) {
  const { authData} = useSelector((state) => state.auth)
  
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const [editMode, setEditMode] = useState(false)
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const CourseTitleEditDelete = async (e, id) => {
    e.stopPropagation()
    try {
      dispatch(deleteCourse(id))
      dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: {
          feedback: "Course deleted successfully",
          severity: "success",
        },
      })
    } catch (error) {
      dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: { feedback: error?.response?.data, severity: "error" },
      })
    }
  }

  const handleEdit = async (e) => {
    e.stopPropagation()
    setEditMode(false)
    try {
      dispatch(updateCourse(course._id, formData))
      dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: {
          feedback: "Course updated successfully",
          severity: "success",
        },
      })
    } catch (error) {
      dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: { feedback: error?.response?.data, severity: "error" },
      })
    }
  }

  const handleClick = async (e) => {
    e.stopPropagation()

    if (authData.privilege === "Teacher" && e.detail === 2) setEditMode(true)
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ width: "100%" }}
    >
      {editMode ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowBackIcon
            onClick={() => {
              setEditMode(false)
            }}
          />
          <TextField
            label="Change course name"
            value={formData.title}
            defaultValue={course.title}
            onChange={handleChange}
            name="title"
          />
          <Tooltip title="Edit">
            <IconButton onClick={handleEdit}>
              <EditIcon color="success" />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Typography onClick={handleClick}>{course.title}</Typography>
      )}
      <IconButton
        className="teacherOnly"
          sx={{ zIndex: 100 }}
          onClick={(e) => CourseTitleEditDelete(e, course._id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
    </Stack>
  )
}
