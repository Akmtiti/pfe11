import { MenuItem, Stack, TextField } from "@mui/material"
import React from "react"
import { UploadButtons } from "./UploadButtons"

export function AddCourse(handleChange, classes, files, handleCurrentPdf) {
  return (
    <>
      <Stack spacing={2} style={{ width: "200px" }}>
        <TextField name="classId" select label="Class" onChange={handleChange}>
          {classes.map((classe) => (
            <MenuItem key={classe._id} value={classe._id}>
              {classe.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField sx={{m: 2}} name="title" label="Course name" onChange={handleChange} />
      </Stack>

      {/* Upload buttons */}
      {UploadButtons(files, handleCurrentPdf)}
    </>
  )
}
