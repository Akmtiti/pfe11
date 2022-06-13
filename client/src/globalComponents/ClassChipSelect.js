import { Avatar, Chip, InputLabel } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"

function ClassChipSelect({ variant, setFormData, formData }) {
  const { classes } = useSelector((state) => state.class)

  const handleAddChip = (classe) => {
    setFormData({
      ...formData,
      classes: [...formData.classes, classe],
    })
  }

  const handleDeleteChip = (classe) => {
    setFormData({
      ...formData,
      classes: formData.classes.filter((c) => c !== classe),
    })
  }

  return (
    <div style={{ width: "100%" }}>
      <InputLabel>
        {variant === "readOnly"
          ? "classes sélectionnées"
          : "Sélectionner les classes"}
      </InputLabel>
      <div className="classes-container">
        {classes?.map((classe) => (
          <Chip
            key={classe._id}
            size="small"
            label={classe.title}
            color={
              formData.classes?.find((c) => c === classe._id)
                ? "secondary"
                : "primary"
            }
            onClick={() => {
              if (variant === "readOnly") return

              formData.classes?.find((c) => c === classe._id)
                ? handleDeleteChip(classe._id)
                : handleAddChip(classe._id)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ClassChipSelect
