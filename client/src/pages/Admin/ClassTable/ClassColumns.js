import React from "react"
import moment from "moment"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteClass } from "src/store/actions/class"
import { IconButton } from "@mui/material"
import AddEditClassDialog from "./AddEditClassDialog"
import ConfirmDialog from "../../../globalComponents/ConfirmDialog"

function ClassColumns(dispatch) {
  const handleDelete = async (row) => {
    dispatch(deleteClass(row.id))
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
      field: "title",
      headerName: "Titre",
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (rowData) => (
        <>
           <ConfirmDialog
            actionFn={() => handleDelete(rowData)}
            schemeName="class"
            action="delete"
          >
            <DeleteIcon color="error" />
          </ConfirmDialog>
          <AddEditClassDialog mode="Edit" />
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

export default ClassColumns

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
