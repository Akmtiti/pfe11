import { SET_SELECTED_ROW } from "src/store/constants"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataGridComponent from "../DataGridComponent/DataGridComponent"
import { Button, InputLabel, Stack, TextField } from "@mui/material"
import ClassColumns from "./ClassColumns"
import {
  createClass,
  findClasses,
  updateClass,
} from "../../../store/actions/class"
import AddEditClassDialog from "./AddEditClassDialog"

function ClassTable() {
  const dispatch = useDispatch()
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const { classes } = useSelector((state) => state.class)
  useEffect(() => {
    setColumns(ClassColumns(dispatch))
    dispatch(findClasses())
    return () =>
      dispatch({
        type: SET_SELECTED_ROW,
        payload: null,
      })
  }, [])
  useEffect(() => {
    setRows(classes)
  }, [classes])


  return (
    <>
      <AddEditClassDialog mode="Add" />
      <DataGridComponent
        rows={rows}
        columns={columns}
        onRowEdit={updateClass}
      />
    </>
  )
}

export default ClassTable
