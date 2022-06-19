import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useSelector, useDispatch } from "react-redux"
import { API } from "../../api"
import { HiddenInputs } from "./HiddenInputs"
import AddIcon from "@mui/icons-material/Add"
import { IconButton, Stack, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { updateCourse } from "../../store/actions/course"
import { feedbackError, feedbackSuccess } from "../../store/actions/feedback"

const folders = ["course", "TD", "TP", "examen"]

export default function Folders({ course }) {
  const dispatch = useDispatch()

  const handleAddFile = async (e) => {
    const folder = e.target.id
    const file = e.target.files[0]
    const formatedFilePah = replaceAll(file.name, " ", "_")

    let filesPath = [...course.filesPath, `${folder}/${formatedFilePah}`]


    try {
      dispatch(updateCourse(course._id, { filesPath: filesPath }))
      dispatch(feedbackSuccess("File added successfully"))

      var formDataImage = new FormData()
      formDataImage.append("files", file)

      await API.post(`/course/upload`, formDataImage, {
        params: {
          id: course._id,
          fileCategory: folder,
        },
      })
    } catch (error) {
      dispatch(feedbackError(error?.response?.data))
    }
  }

  const handleDeleteFile = async (id, fileName) => {
    let filesPath = course.filesPath.filter(
      (file) => file.indexOf(fileName) === -1
    )

    try {
      dispatch(updateCourse(id, { filesPath: filesPath }))
      dispatch(feedbackSuccess("File deleted successfully"))
    } catch (error) {
      dispatch(feedbackError(error?.response?.data))
    }
    await API.post(`/course/deleteUpload`, {
      id: course._id,
      filePath: fileName,
    })
  }

  return (
    <>
      {folders.map((folder, key) => (
        <Accordion key={key}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{folder} </Typography>
            </AccordionSummary>
            <IconButton
              className="teacherOnly"
              style={{ marginRight: 10 }}
              onClick={() => document.getElementById(folder).click()}
            >
              <AddIcon />
            </IconButton>
          </Stack>
          <AccordionDetails>
            {course?.filesPath
              .filter(
                (filePath) =>
                  folder === filePath.slice(0, filePath.indexOf("/"))
              )
              .map((file, key) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <a
                    key={key}
                    target="_blank"
                    href={`${API.defaults.baseURL}/courseFiles/${
                      course._id
                    }/${replaceAll(file, " ", "_")}`}
                  >
                    {file.slice(file.indexOf("/") + 1)} <br />
                  </a>

                  <Tooltip className="teacherOnly" title="Delete">
                    <IconButton
                      sx={{ zIndex: 100 }}
                      onClick={() => handleDeleteFile(course._id, file)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <HiddenInputs handleAddFile={handleAddFile} />
    </>
  )
}


function replaceAll(string, search, replace) {
  return string.split(search).join(replace)
}
