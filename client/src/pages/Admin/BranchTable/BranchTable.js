import { SET_SELECTED_ROW } from "src/store/constants"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BranchColumns from "./BranchColumns"
import DataGridComponent from "../DataGridComponent/DataGridComponent"
import { Button, InputLabel, Stack, TextField } from "@mui/material"
import { createBranch } from "src/store/actions/branch"

function BranchDataGrid() {
  const [branchTitle, setBranchTitle] = useState("")

  const dispatch = useDispatch()
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const { branches } = useSelector((state) => state.branch)

  useEffect(() => {
    setColumns(BranchColumns(dispatch))

    return () => dispatch({ type: SET_SELECTED_ROW, payload: null })
  }, [])

  useEffect(() => {
    setRows(branches)
  }, [branches])

  const submit = async () => {

    dispatch(createBranch({title : branchTitle}))
  }

  return (
    <Stack spacing={2}>
      <InputLabel>Ajouter une branche</InputLabel>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          label="Branche"
          onChange={(e) => setBranchTitle(e.target.value)}
        />
        <Button onClick={submit}>Confirmer</Button>
      </Stack>
      <DataGridComponent rows={rows} columns={columns} />
    </Stack>
  )
}

export default BranchDataGrid
