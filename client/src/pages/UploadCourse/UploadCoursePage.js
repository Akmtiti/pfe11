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
import { Fragment } from "react"
import { useState } from "react"
import { ReactReduxContext } from "react-redux"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { API } from "./../../axios"

const branches = [
  { name: "branch1", classes: ["class1", "class2", "class3"] },
  { name: "branch2", classes: ["class1x", "class2x", "class3x"] },
  { name: "branch3", classes: ["class1z", "class2z", "class3z"] },
]

function UploadCoursePage() {
  const [files, setFiles] = useState({
    course: [],
    TD: [],
    TP: [],
    examen: [],
  })
  const [fileState, setFileState] = useState({})
  const [formData, setFormData] = useState({
    branchName: "",
    class: "",
    courseName: "",
    level: "",
  })

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    // await Axios.post(
    //   `/course/upload/627caf233da5a1a04ba4f617/${fileName}`,
    //   formData
    // )
    Object.keys(files).forEach(async function (key) {
      var formDataImage = new FormData()

      if (files[key].length > 0) {
        for (const pdf of files[key]) {
          formDataImage.append("files", pdf)
        }

        await API.post(
          `/course/upload/627caf233da5a1a04ba4f617/${key}`,
          formDataImage
        )
      }

      // await Axios.patch(
      //   `/course/addFilePath/627caf233da5a1a04ba4f617/${file.name}`
      // )
      // files[key].map((pdf, key) => {
    })
  }

  const handleAddFile = async (e) => {
    const type = e.target.id
    const file = e.target.files[0]

    setFiles({
      ...files,
      [type]: [...files[type], file],
    })
    // setFiles({
    //   ...files,
    //   [type]: [...files[type], { [fileName]: formDataImage }],
    // })

    // Axios.patch("/course/updateCourse", { formData }, {})
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
              name="branchName"
              select
              label="Branch"
              onChange={handleChange}
            >
              {branches.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="class"
              select
              label="Class"
              onChange={handleChange}
            >
              {branches[0].classes.map((classe) => (
                <MenuItem key={classe} value={classe}>
                  {classe}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="courseName"
              label="Course name"
              onChange={handleChange}
            />
            <TextField
              name="level"
              label="Course level"
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
