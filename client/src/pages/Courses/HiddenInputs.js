import React from "react"

export function HiddenInputs({handleAddFile}) {
  return (
    <div hidden>
      <input
        accept="application/pdf,application/vnd.ms-excel"
        id="course"
        type="file"
        onChange={handleAddFile}
      />
      <input
        accept="application/pdf,application/vnd.ms-excel"
        id="TD"
        type="file"
        onChange={handleAddFile}
      />
      <input
        accept="application/pdf,application/vnd.ms-excel"
        id="TP"
        type="file"
        onChange={handleAddFile}
      />
      <input
        accept="application/pdf,application/vnd.ms-excel"
        id="examen"
        type="file"
        onChange={handleAddFile}
      />
    </div>
  )
}
