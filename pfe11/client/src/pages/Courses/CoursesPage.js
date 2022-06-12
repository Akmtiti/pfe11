import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { API } from "../../axios"
import { Box, CircularProgress, Grid } from "@mui/material"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import AccordionBranch from "./AccordionBranch"

const currentUser = JSON.parse(localStorage.getItem("currentUser"))

function CoursesPage() {
  // if (!currentUser) window.location.href = "/"
  const [fetchedCourses, setFetchedCourses] = useState([])
  useEffect(async () => {
    setFetchedCourses(
      (
        await API.get("/user/getFields", {
          params: { filter: { privilege: "Teacher" } },
        })
      ).data
    )
  }, [])
  return (
    <>
      <Header />
      <div className="teachersPage">
        <h1>Courses</h1>
        {fetchedCourses.length ? (
          <AccordionBranch />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
      <Footer />
    </>
  )
}

export default CoursesPage
