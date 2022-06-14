import { SET_SELECTED_ROW } from "src/store/constants"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataGridComponent from "../DataGridComponent/DataGridComponent"
import {  updateTeacher } from "../../../store/actions/teacher"
import TeacherColumns from "./TeacherColumns"
import AddEditTeacherDialog from "./AddEditTeacherDialog"

function TeacherTable() {
  const dispatch = useDispatch()
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const { teachers } = useSelector((state) => state.teacher)


  useEffect(() => {
    setColumns(TeacherColumns(dispatch))
    return () =>
      dispatch({
        type: SET_SELECTED_ROW,
        payload: null,
      })
  }, [])
  useEffect(() => {
    setRows(teachers)
  }, [teachers])


  return (
   <div>
     <AddEditTeacherDialog mode="Add" />
    
     <DataGridComponent
       rows={rows}
       columns={columns}
       onRowEdit={updateTeacher}
     />
   </div>
  )
}

export default TeacherTable
