import { SET_SELECTED_ROW } from "src/store/constants";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGridComponent from "../DataGridComponent/DataGridComponent";
import { Button, InputLabel, Stack, TextField } from "@mui/material";
import ClassColumns from "./ClassColumns";
import { createClass, findClasses, updateClass } from "../../../store/actions/class";

function ClassTable() {
  const [newClass, setNewClass] = useState("");
  const [department, setDepartment] = useState("");
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const {
    classes
  } = useSelector(state => state.class);
  useEffect(() => {
    setColumns(ClassColumns(dispatch));
    dispatch(findClasses());
    return () => dispatch({
      type: SET_SELECTED_ROW,
      payload: null
    });
  }, []);
  useEffect(() => {
    setRows(classes);
  }, [classes]);

  const submit = async () => {
    dispatch(createClass({
      title: newClass,
      department: department
    }));
  };

  return <>
      <Stack spacing={2} sx={{
      width: "50%",
      marginBottom: "2rem"
    }}>
        <InputLabel>Classe</InputLabel>
        <TextField label="Classe" onChange={e => setNewClass(e.target.value)} />
        <InputLabel>Département</InputLabel>
        <TextField label="Département" onChange={e => setDepartment(e.target.value)} />
        <Button onClick={submit}>Confirmer</Button>
      </Stack>
      <DataGridComponent rows={rows} columns={columns} onRowEdit={updateClass} />
    </>;
}

export default ClassTable;