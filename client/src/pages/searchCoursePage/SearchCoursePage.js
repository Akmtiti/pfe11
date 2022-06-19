import { Button, CardMedia, Grid, Stack, Tooltip } from "@mui/material"
import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { API, getAllFiles } from "../../api"
import { getBase64 } from "../../functions/fileFunction"
import { createCourse } from "../../store/actions/course"
import { AddCourse } from "./AddCourse"
import EditCourse from "./EditCourse"
import { HiddenInputs } from "../Courses/HiddenInputs"
import AutocompleteSearch from "./AutocompleteSearch"

function SearchCoursePage() {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch()
  const { classes } = useSelector((state) => state.class)
  const [currentPdf, setCurrentPdf] = useState("")

  const [files, setFiles] = useState({
    course: [],
    TD: [],
    TP: [],
    examen: [],
  })
  const [formData, setFormData] = useState({
    classId: "",
    title: "",
    teacherId: currentUser?._id,
  })

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      let createdCourse = await dispatch(createCourse(formData))
      console.log(createdCourse)
      dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: {
          feedback: "Course created successfully",
          severity: "success",
        },
      })

      Object.keys(files).forEach(async function (key) {
        var formDataImage = new FormData()

        if (files[key].length > 0) {
          for (const pdf of files[key]) {
            formDataImage.append("files", pdf)

            await API.patch(`/course/addFilePath/${createdCourse._id}`, {
              path: key + "/" + pdf.name,
            })
          }

          await API.post(
            `/course/upload/${createdCourse._id}/${key}`,
            formDataImage
          )
        }

        // files[key].map((pdf, key) => {
      })
    } catch (error) {
      dispatch({
        type: "SET_FEEDBACK_OBJECT",
        payload: { feedback: error?.response?.data, severity: "error" },
      })
    }
  }

  const handleAddFile = async (e) => {
    const type = e.target.id
    const file = e.target.files[0]

    setFiles({
      ...files,
      [type]: [...files[type], file],
    })
  }

  const handleCurrentPdf = async (pdf) => {
    setCurrentPdf(await getBase64(pdf))
  }

  const [mode, setMode] = useState("Add")
  return (
    <Stack sx={{p:2}} spacing={5}>
      <h1>Search course</h1>

      <AutocompleteSearch />

    </Stack>
  )
}

export default SearchCoursePage
