import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useSelector } from "react-redux"
import { API } from "../../api"

export default function AccordionClasses({ classe }) {
  const { courses } = useSelector((state) => state.course)

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{classe.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {courses
            .filter((course) => course.classId === classe._id)
            .map((course, key) => (
              <Accordion key={key}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{course.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {course?.filesPath.map((file, key) => (
                    <a
                      key={key}
                      href={`${API.defaults.baseURL}/courseFiles/${course._id}/${file}`}
                    >
                      {file.slice(file.indexOf("/") + 1)} <br/>
                    </a>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
