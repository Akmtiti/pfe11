import StarIcon from "@mui/icons-material/Star"
import { Avatar, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch } from "react-redux"
import React from "react"

import { deletePost, topSwitch } from "../../../actions/posts.js"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import moment  from 'moment';

function DataGridColumns(hide = [], editable = []) {
  const dispatch = useDispatch()
  const handleDeleteRow = async (e, { row }) => {
    dispatch(deletePost(row._id))
  }

  const toggleTopPost = (row) => {
    dispatch(topSwitch({ id: row?._id, val: row.top ? false : true }))
  }

  const fields = [
    "top",
    "avatar",
    "title",
    "prestataireId",
    "date",
    "status",
    "action",
  ]

  let columns = [
    {
      renderCell: (params) => {
        const Star = params?.row?.top ? StarIcon : StarBorderIcon

        return (
          <Star className="top-btn" onClick={() => toggleTopPost(params.row)} />
        )
      },

      hide: hide.includes("top") ? true : false,
    },
    {
      renderCell: (cellValues) => (
        <Avatar src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png" />
      ),
    },
    {
      editable: true,
    },
    {
      // editable: true,
      valueFormatter: (params) => params.value?.location,
      // valueGetter:  (params) => params.value?.location
    },
    {
      valueFormatter: (params) => moment( params.value).format("DD/MM/YYYY HH:mm"),
      // valueGetter: (params) => moment( params.value).format("DD/MM/YYYY HH:mm"),
      // valueGetter:  (params) => params.value?.location
      editable: false,
    },
    {
      editable: editable.includes("status") ? false : true,
      type: "singleSelect",
      valueOptions: ["Waiting", "Public", "Archived"],
    },
    {
      headerName: "Action",
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            color="error"
            onClick={(event) => {
              handleDeleteRow(event, cellValues)
            }}
          >
            <DeleteIcon />
          </IconButton>
        )
      },
    },
  ]

  // Center columns, filed and headerName
  columns = columns.map(
    (column, index) =>
      (column = {
        ...column,
        ...{
          field: fields[index],
          headerName: capitalizeFirstLetter(fields[index]),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      })
  )

  return columns
}

export default DataGridColumns

function capitalizeFirstLetter(string) {
  if (string === "prestataireId") string = "location"
  return string.charAt(0).toUpperCase() + string.slice(1)
}
