import { Button, Stack } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import React from "react"
import { useState } from "react"
import AddEditUserDialog from "./AddEditUserDialog"
import { useEffect } from "react"

import BranchDataGrid from "./BranchTable/BranchTable"
import { findBranches } from "../../store/actions/branch"
import ClassTable from "./ClassTable/ClassTable"
import StudentTable from "./StudentTable/StudentTable"
import TeacherTable from "./TeacherTable/TeacherTable"
import { findTeachers } from "../../store/actions/teacher"
import { findStudents } from "../../store/actions/student"
import { findClasses } from "../../store/actions/class"
import SnackbarFeedback from "../../globalComponents/SnackbarFeedback"
import { useDispatch } from "react-redux"

function AdminPage() {
  const [selectedSchemeTable, setSelectedSchemeTable] = useState("Teacher") // "Teacher" or "Student"
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findStudents())
    dispatch(findTeachers())
    dispatch(findBranches())
    dispatch(findClasses())
  }, [])

  // Handles
  const handleUserSwitch = (selectedScheme) => {
    setSelectedSchemeTable(selectedScheme)
  }

  const selectTable = () => {
    switch (selectedSchemeTable) {
      case "Branch":
        return <BranchDataGrid />
      case "Class":
        return <ClassTable />
      case "Student":
        return <StudentTable />

      case "Teacher":
        return <TeacherTable />
    }
  }

  return (
    <div className="adminPage">
      <SnackbarFeedback />

      <Button
        href="/"
        sx={{ mb: 5 }}
      >
        Accueil
      </Button>
      {/* Above Table */}
      <Stack direction="row" spacing={2}>
        {selectSchemeButton("Teacher")}
        {selectSchemeButton("Student")}
        {selectSchemeButton("Branch")}
        {selectSchemeButton("Class")}

      </Stack>

      {/* Table */}
      {selectTable()}
    </div>
  )

  function selectSchemeButton(selection) {
    return (
      <Button
        variant={selectedSchemeTable === selection ? "contained" : ""}
        onClick={() => {
          handleUserSwitch(selection)
        }}
      >
        {selection}
      </Button>
    )
  }
}

export default AdminPage

