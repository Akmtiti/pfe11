import { LinearProgress, Stack } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid, frFR } from "@mui/x-data-grid"
import { SET_SELECTED_ROW } from "src/store/constants.js"

function DataGridComponent(props) {
  const dispatch = useDispatch()
  const { selectedRow } = useSelector((state) => state.dataGrid)

  const handleEditRow = async (newRow, oldRow) => {
    props.onRowEdit(newRow)
    return newRow
  }

  // var rows = DataGridRows(props.filter, props.prestataireId)

  return (
    <div>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        {...props}
        // Styling
        autoHeight={true}
        sx={{ fontSize: "1.2rem" }}
        // Content
        rows={props.rows || []}
        columns={props.columns || []}
        getRowId={(row) => row?._id}
        // Edit row
        processRowUpdate={(newRow, oldRow) => handleEditRow(newRow, oldRow)}
        // Loading
        components={{
          NoRowsOverlay: NoResultsOverlay,
          LoadingOverlay: LinearProgress,
        }}
        // loading={props.noRows ? false : !props.rows?.length}
        // Pagination
        pageSize={5}
        // rowsPerPageOptions={[5, 10, 20]}

        // Selection
        onSelectionModelChange={(ids) => {
          if (props.allowSelectedRow === false) return

          if (ids[0] === selectedRow?._id)
            return dispatch({ type: SET_SELECTED_ROW, payload: null })

          const selectedRowData = props.rows.filter((row) => row._id === ids[0])
          dispatch({ type: SET_SELECTED_ROW, payload: selectedRowData[0] })
        }}
        selectionModel={[selectedRow]}
        hideFooterSelectedRowCount={true}
        // checkboxSelection
        // onCellClick={(e) => {
        //   console.log(e.row)
        //   console.log(e.row.isSelected)
        //   if (e.row.isSelected) {
        //     console.log(e.component)
        //     console.log(e)
        //     e.component.clearSelection()
        //   } else e.row.isSelected = true
        // }}

        // Enable new stuff
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  )

  function NoResultsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        {props.noRows}
      </Stack>
    )
  }
}

export default DataGridComponent
