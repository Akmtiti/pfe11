import {
  Alert,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import React from "react"
import { useState } from "react"
import AddEditUserDialog from "./AddEditUserDialog"
import { useEffect } from "react"
import { API } from "./../../axios"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ShowConfirmationDialog from "./ShowDeleteConfirmationDialog"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  PULL_FETCHED_DATA,
  PUSH_FETCHED_DATA,
  SET_FEEDBACK,
  SET_FETCHED_DATA,
} from "../../store/constants"

import { DataGrid, useGridApiRef } from "@mui/x-data-grid"
import BranchDataGrid from "./BranchDataGrid"
import { findBranches } from "../../store/actions/branch"

function AdminPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  // if (currentUser?.role !== 'Admin') window.location.href = "/"
  const [objectFeedback, ObjectFeedback] = useState({
    text: "",
    severity: "success",
  })
  const [selectedSchemeTable, setSelectedSchemeTable] = useState("Teacher") // "Teacher" or "Student"
  const { fetchedUsersData, fetchedBranchData, fetchedClassData, feedback } =
    useSelector((state) => state.scheme)
  const dispatch = useDispatch()

  // Fetch and dispatch
  // useEffect(async () => {
  //   let fetchedUserData = await Axios.get(`/user/getFields`, {
  //     params: { filter: { privilege: { $in: ["Student", "Teacher"] } } },
  //   })
  //   console.log(fetchedUserData)
  //   dispatch({ type: "SET_FETCHED_USERS_DATA", payload: fetchedUserData.data })
  // }, [])

  // Scheme selector
  useEffect(async () => {
    let fetchedSchemeData = []
    let schemeSelector = ""
    switch (selectedSchemeTable) {
      case "Teacher":
      case "Student":
        schemeSelector = "fetchedUsersData"

        if (fetchedUsersData.length === 0)
          fetchedSchemeData = await API.post("/custom", {
            filters: {
              privilege: { $in: ["Student", "Teacher"] },
            },
            scheme: "user",
            method: "get",
          })

        break
      case "Branch":
        schemeSelector = "fetchedBranchData"

        if (fetchedBranchData.length === 0)
          fetchedSchemeData = await API.post("/custom", {
            scheme: "branch",
            method: "get",
          })

        break
      case "Class":
        schemeSelector = "fetchedClassData"

        if (fetchedClassData.length === 0)
          fetchedSchemeData = await API.post("/custom", {
            scheme: "class",
            method: "get",
          })

        break

      default:
        break
    }
    if (fetchedSchemeData.length !== 0)
      if (fetchedSchemeData?.data?.length !== 0) {
        dispatch({
          type: SET_FETCHED_DATA,
          payload: { [schemeSelector]: fetchedSchemeData.data },
        })
      }
  }, [selectedSchemeTable])

  useEffect(() => {
    dispatch(findBranches())
  }, [])

  // Handles
  const handleUserSwitch = (selectedScheme) => {
    setSelectedSchemeTable(selectedScheme)
  }

  const selectTable = () => {
    switch (selectedSchemeTable) {
      case "Branch":
        return <BranchDataGrid />

      case "Teacher":
      case "Student":
        return teacherStudentTable()
    }
  }

  return (
    <div className="adminPage">
      <a href="/">
        <Button
          sx={{ mb: 5 }}
          variant={selectedSchemeTable === "Teacher" ? "contained" : ""}
        >
          Home
        </Button>
      </a>
      {/* Above Table */}
      <Stack direction="row" spacing={2}>
        {selectSchemeButton("Teacher")}
        {selectSchemeButton("Student")}
        {selectSchemeButton("Branch")}
        {selectSchemeButton("Class")}

        <AddEditUserDialog
          title={"Add " + selectedSchemeTable}
          button={<AddIcon color="secondary" fontSize="large" />}
          buttonStyle={{ marginLeft: "auto" }}
        />
      </Stack>
      <p style={{ margin: "10px 0" }}>{feedback} </p>
      {/* Table */}

      {selectTable()}
    </div>
  )

  function teacherStudentTable() {
    return (
      <TableContainer>
        <Table stickyHeader>
          {/* Table head */}
          <TableHead>
            <TableRow>
              {selectedSchemeTable === "Teacher" ? (
                <>
                  <TableCell>Username</TableCell>
                  <TableCell>CIN</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Specialty</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Description</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Username</TableCell>
                  <TableCell>CIN</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Class</TableCell>
                </>
              )}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {fetchedUsersData
              .filter((user) => user.privilege === selectedSchemeTable)
              .map((user, key) => (
                <TableRow key={key}>
                  {selectedSchemeTable === "Teacher" ? (
                    <>
                      <TableCell>{user?.username}</TableCell>
                      <TableCell>{user?.cin}</TableCell>
                      <TableCell>{user?.phone}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>{user?.specialty}</TableCell>
                      <TableCell>{user?.rank}</TableCell>
                      <TableCell>{user?.description}</TableCell>
                      {actions(user)}
                    </>
                  ) : (
                    <>
                      <TableCell>{user?.username}</TableCell>
                      <TableCell>{user?.cin}</TableCell>
                      <TableCell>{user?.phone}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>{user?.class}</TableCell>
                      {actions(user)}
                    </>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

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

  function actions(user) {
    return (
      <>
        <TableCell>
          <AddEditUserDialog
            title={"Edit " + selectedSchemeTable}
            userData={user}
            button={
              <EditIcon style={{ color: "#1bb719", cursor: "pointer" }} />
            }
          />

          <ShowConfirmationDialog
            title="Delete User"
            userToDelete={user}
            description={"Are you sure to delete " + user?.username}
            button={
              <DeleteForeverIcon
                style={{ color: "#b54827", cursor: "pointer" }}
              />
            }
          />
        </TableCell>
      </>
    )
  }
}

export default AdminPage

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
