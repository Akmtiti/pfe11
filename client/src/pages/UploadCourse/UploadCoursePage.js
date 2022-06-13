import {
  Button,
  CardMedia,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material"
import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Footer from "../../globalComponents/Footer"
import Header from "../../globalComponents/Header"
import { API } from "../../api"
import { createCourse } from "../../store/actions/course"

function UploadCoursePage() {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch()
  const { classes } = useSelector((state) => state.class)

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
  return (
    <>
      <Header />
      <div className="uploadCoursePage">
        <h1>Upload Course</h1>

        <Stack spacing={2}>
          {/* Course inputs */}
          <Stack spacing={2} style={{ width: "200px" }}>
            <TextField
              name="classId"
              select
              label="Class"
              onChange={handleChange}
            >
              {classes.map((classe) => (
                <MenuItem key={classe._id} value={classe._id}>
                  {classe.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="title"
              label="Course name"
              onChange={handleChange}
            />
          </Stack>

          {/* Upload buttons */}
          <Stack
            spacing={2}
            style={{ width: "200px" }}
            className="upload-file-button-container"
          >
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  document.getElementById("course").click()
                }}
              >
                {" "}
                Add Course
              </Button>
              {files.course.map((pdf, key) => (
                <Tooltip key={key} title={pdf.name}>
                  <CardMedia
                    component="img"
                    style={{ width: "25%" }}
                    image="assets/images/pdf.png"
                  />
                </Tooltip>
              ))}
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  document.getElementById("TD").click()
                }}
              >
                Add TD
              </Button>

              {files.TD.map((pdf, key) => (
                <Tooltip key={key} title={pdf.name}>
                  <CardMedia
                    component="img"
                    style={{ width: "25%" }}
                    image="assets/images/pdf.png"
                  />
                </Tooltip>
              ))}
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  document.getElementById("TP").click()
                }}
              >
                {" "}
                Add TP
              </Button>
              {files.TP.map((pdf, key) => (
                <Tooltip key={key} title={pdf.name}>
                  <CardMedia
                    component="img"
                    style={{ width: "25%" }}
                    image="assets/images/pdf.png"
                  />
                </Tooltip>
              ))}
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  document.getElementById("examen").click()
                }}
              >
                Add Exam
              </Button>
              {files.examen.map((pdf, key) => (
                <Tooltip key={key} title={pdf.name}>
                  <CardMedia
                    component="img"
                    style={{ width: "25%" }}
                    image="assets/images/pdf.png"
                  />
                </Tooltip>
              ))}
            </div>
          </Stack>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ width: "10%" }}
          >
            Submit
          </Button>

          {/* <a
            href="http://localhost:8001/courseFiles/627caf233da5a1a04ba4f617/TP/RapportPFE.pdf"
            download
            rel="noopener noreferrer"
            target="_blank"
          >
            Download File
          </a> */}

          {/* <iframe
            src="http://localhost:8001/courseFiles/627caf233da5a1a04ba4f617/TP/RapportPFE.pdf"
            width="100%"
            height="500px"
          ></iframe> */}
        </Stack>
      </div>

      <Footer />
      <input
        style={{ display: "none" }}
        accept="application/pdf,application/vnd.ms-excel"
        id="course"
        type="file"
        onChange={handleAddFile}
      />
      <input
        style={{ display: "none" }}
        accept="application/pdf,application/vnd.ms-excel"
        id="TD"
        type="file"
        onChange={handleAddFile}
      />
      <input
        style={{ display: "none" }}
        accept="application/pdf,application/vnd.ms-excel"
        id="TP"
        type="file"
        onChange={handleAddFile}
      />
      <input
        style={{ display: "none" }}
        accept="application/pdf,application/vnd.ms-excel"
        id="examen"
        type="file"
        onChange={handleAddFile}
      />
    </>
  )
}

export default UploadCoursePage
