import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const courses = ["course1", "course2", "course3"]

export default function AccordionClasses(props) {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{props.classe}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          pariatur autem molestiae maxime doloribus laborum sit fugit voluptate
          vitae atque exercitationem, beatae deleniti numquam vero id obcaecati
          assumenda ab? Alias?
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
