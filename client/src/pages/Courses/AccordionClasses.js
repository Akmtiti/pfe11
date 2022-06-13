import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"


export default function AccordionClasses({classe}) {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{classe.title}</Typography>
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
