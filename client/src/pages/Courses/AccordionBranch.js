import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AccordionClasses from "./AccordionClasses"

const branches = [
  { name: "branch1", classes: ["class1", "class2", "class3"] },
  { name: "branch2", classes: ["class1x", "class2x", "class3x"] },
  { name: "branch3", classes: ["class1z", "class2z", "class3z"] },
]

export default function AccordionBranch() {
  return (
    <div>
      {branches.map((branch, key) => (
        <Accordion key={key}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{branch.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {branch.classes.map((classe, key) => (
              <AccordionClasses classe={classe} />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
