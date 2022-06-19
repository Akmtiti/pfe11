import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useDispatch, useSelector } from "react-redux"
import { API } from "../../api"
import { IconButton, Stack } from "@mui/material"
import Folders from "./Folders"
import { AccordionTitleAddCourse } from "./AccordionTitleAddCourse"
import { CourseTitleDelete } from "./CourseTitleEditDelete"

export default function AccordionClasses({ classe }) {
  const { courses } = useSelector((state) => state.course)

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccordionTitleAddCourse classe={classe} />
        </AccordionSummary>
        <AccordionDetails>
          {courses
            .filter((course) => course.classId === classe._id)
            .map((course, key) => (
              <Accordion key={key}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <CourseTitleDelete course={course} />
                </AccordionSummary>
                <AccordionDetails>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Folders course={course} />
                  </Stack>

                  {/* {course?.filesPath.map((file, key) => (
                    <a
                      key={key}
                      target="_blank"
                      href={`${API.defaults.baseURL}/courseFiles/${course._id}/${file}`}
                    >
                      {file.slice(file.indexOf("/") + 1)} <br />
                    </a>
                  ))} */}
                </AccordionDetails>
              </Accordion>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
