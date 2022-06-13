import { SET_SELECTED_ROW } from "src/store/constants"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataGridComponent from "../DataGridComponent/DataGridComponent"
import { findStudents, updateStudent } from "../../../store/actions/student"
import StudentColumns from "./StudentColumns"
import AddEditStudentDialog from "./AddEditStudentDialog"

function StudentTable() {
  const dispatch = useDispatch()
  const { students } = useSelector((state) => state.student)


  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  useEffect(() => {
    setColumns(StudentColumns(dispatch))

    return () =>
      dispatch({
        type: SET_SELECTED_ROW,
        payload: null,
      })
  }, [])

  useEffect(() => {
    setRows(students)
  }, [students])

  return (
    <div>
      <AddEditStudentDialog mode="Add" />
      <DataGridComponent rows={rows} columns={columns} onRowEdit={updateStudent} />
    </div>
  )
}

export default StudentTable
