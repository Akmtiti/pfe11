import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import TeacherCard from "./TeacherCard"
import { API } from "../../api"
import { Box, CircularProgress, Grid } from "@mui/material"
import Header from "../../globalComponents/Header"
import Footer from "../../globalComponents/Footer"

function TeachersPage() {
  const [fetchedTeachers, setFetchedTeachers] = useState([])
  useEffect(() => {
    ;(async () => {
      setFetchedTeachers(
        (
          await API.get("/user/getFields", {
            params: { filter: { privilege: "Teacher" } },
          })
        ).data
      )
    })()
  }, [])
  return (
    <>
      <Header />
      <div className="teachersPage">
        <h1>Teachers</h1>
        {fetchedTeachers.length ? (
          <Grid container rowSpacing={4} spacing={2}>
            {fetchedTeachers.map((teacher, key) => (
              <Grid key={key} item xs={3}>
                <TeacherCard teacher={teacher} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </>
  )
}

export default TeachersPage
