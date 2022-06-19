import { Autocomplete, Stack, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { API, getAllFiles } from "../../api"

function AutocompleteSearch() {
  const { courses } = useSelector((state) => state.course)

  const [value, setValue] = React.useState("")

  const [options, setOptions] = useState([])
  useEffect(() => {
    if (courses.length > 0) {
      const reformatedCompanies = courses.reduce((course, row) => {
        const companyRows = []
        row.filesPath?.map((filePath) => {
          companyRows.push({
            _id: row._id,
            title: row.title,
            file: filePath,
          })
        })
        course = course.concat(companyRows)
        return course
      }, [])

      setOptions(reformatedCompanies)
    }
  }, [courses])

  return (
     <Stack
      spacing={2}
     >
      <Autocomplete
        disablePortal
        options={options}
        groupBy={(course) => course?.title}
        getOptionLabel={(course) => course?.file}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} label="Course" />}
      />
      <iframe
        src={`${API.defaults.baseURL}/courseFiles/${value?._id}/${value?.file}`}
         style={{height : "75vh"}}
      ></iframe>  
     </Stack>
  )
}

export default AutocompleteSearch
