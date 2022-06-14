import React from "react"
import { useEffect } from "react"
import {AccordionDetails, 
  Accordion,
  AccordionSummary,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material"
import Header from "../../globalComponents/Header"
import Footer from "../../globalComponents/Footer"
import { findBranches } from "../../store/actions/branch"
import { useDispatch, useSelector } from "react-redux"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AccordionClasses from "./AccordionClasses"

function CoursesPage() {
  const dispatch = useDispatch()
  const { branches } = useSelector((state) => state.branch)

  useEffect(() => {
    dispatch(findBranches())
  }, [])
  return (
    <>
      <Header />
      <div className="teachersPage">
        <h1>Courses</h1>

        {branches.map((branch, key) => (
          <Accordion key={key}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{branch.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {branch.classes.map((classe, key) => (
                <AccordionClasses classe={classe} />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  )
}

export default CoursesPage

{
  /* <Box sx={{ display: "flex", justifyContent: "center" }}>
<CircularProgress />
</Box> */
}
