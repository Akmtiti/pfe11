import React from "react"
import moment from "moment"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteTeacher } from "src/store/actions/teacher"
import { IconButton } from "@mui/material"
import AddEditTeacherDialog from "./AddEditTeacherDialog"

function TeacherColumns(dispatch) {
  const handleDelete = async (row) => {
    dispatch(deleteTeacher(row.id))
  }

  let columns = [
    {
      field: "createdAt",
      headerName: "Date de création",
      valueFormatter: (params) =>
        moment(params.value).format("DD/MM/YYYY HH:mm"),
    },
    {
      editable: true,
      field: "username",
      headerName: "Nom",
    },
    {
      editable: true,
      field: "email",
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (rowData) => (
        <>
          <IconButton onClick={() => handleDelete(rowData)}>
            <DeleteIcon color="error" />
          </IconButton>
          <AddEditTeacherDialog mode="Edit" />
        </>
      ),
    },
  ] // Center columns, filed and headerName

  columns = columns.map(
    (column, index) =>
      (column = {
        ...{
          headerName: capitalizeFirstLetter(column.field),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        ...column,
      })
  )
  return columns
}

export default TeacherColumns

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
