import React, { useCallback, useMemo } from "react"
import { useEffect } from "react"
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material"
import { findBranches } from "../../store/actions/branch"
import { useDispatch, useSelector } from "react-redux"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AccordionClasses from "./AccordionClasses"

function CoursesPage() {
  const dispatch = useDispatch()
  const { branches } = useSelector((state) => state.branch)
  const { classes } = useSelector((state) => state.class)
  const { authData } = useSelector((state) => state.auth)

  const onlyTeacher = useCallback(() => {
    let onlyTeacherElements = document.querySelectorAll(".teacherOnly")

    onlyTeacherElements.forEach((element) => {
      if (authData?.privilege === "Teacher") element.style.display = "block"
      else element.style.display = "none"
    })
  }, [authData])

  onlyTeacher()

  useEffect(() => {
    dispatch(findBranches())
  }, [])
  return (
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
            {classes
              .filter((classe) => classe.branch === branch._id)
              .map((classe, key) => (
                <AccordionClasses classe={classe} />
              ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default CoursesPage

{
  /* <Box sx={{ display: "flex", justifyContent: "center" }}>
<CircularProgress />
</Box> */
}
