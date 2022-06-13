import React from "react"
import moment from "moment"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteBranch } from "src/store/actions/branch"
import AddEditBranchDialog from "./AddEditBranchDialog"
import { IconButton } from "@mui/material"

function BranchColumns(dispatch) {
  const handleDelete = async (row) => {
    dispatch(deleteBranch(row.id))
  }

  let columns = [
    {
      field: "createdAt",
      headerName: "Date de création",
      valueFormatter: (params) =>
        moment(params.value).format("DD/MM/YYYY HH:mm"),
    },
    {
      field: "title",
      headerName: "Titre",
    },
    {
      field: "action",
      headerName: "Action",

      renderCell: (rowData) => (
        <>
          <IconButton onClick={() => handleDelete(rowData)}>
            <DeleteIcon color="error" />
          </IconButton>
          <AddEditBranchDialog mode="Edit" />
        </>
      ),
    },
  ]

  // Center columns, filed and headerName
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

export default BranchColumns

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
