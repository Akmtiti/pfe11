import { Button, Stack } from "@mui/material"
import React from "react"
import { useState } from "react"

import BranchDataGrid from "./BranchTable/BranchTable"
import ClassTable from "./ClassTable/ClassTable"
import StudentTable from "./StudentTable/StudentTable"
import TeacherTable from "./TeacherTable/TeacherTable"

function AdminPage() {
  const [selectedSchemeTable, setSelectedSchemeTable] = useState("Class") // "Teacher" or "Student"

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

