import {
  Button,
  CardMedia,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material"

export function UploadButtons(files, handleCurrentPdf) {
  return <Stack
    spacing={2}
    style={{ width: "200px" }}
    className="upload-file-button-container"
  >
    <div>
      <Button
        variant="contained"
        onClick={() => {
          document.getElementById("course").click()
        } }
      >
        {" "}
        Add Course
      </Button>
      {files.course.map((pdf, key) => (
        <Tooltip key={key} title={pdf.name}>
          <CardMedia
            onClick={() => handleCurrentPdf(pdf)}
            component="img"
            style={{ width: "25%" }}
            image="assets/images/pdf.png" />
        </Tooltip>
      ))}
    </div>
    <div>
      <Button
        variant="contained"
        onClick={() => {
          document.getElementById("TD").click()
        } }
      >
        Add TD
      </Button>

      {files.TD.map((pdf, key) => (
        <Tooltip key={key} title={pdf.name}>
          <CardMedia
            component="img"
            style={{ width: "25%" }}
            image="assets/images/pdf.png" />
        </Tooltip>
      ))}
    </div>
    <div>
      <Button
        variant="contained"
        onClick={() => {
          document.getElementById("TP").click()
        } }
      >
        {" "}
        Add TP
      </Button>
      {files.TP.map((pdf, key) => (
        <Tooltip key={key} title={pdf.name}>
          <CardMedia
            component="img"
            style={{ width: "25%" }}
            image="assets/images/pdf.png" />
        </Tooltip>
      ))}
    </div>
    <div>
      <Button
        variant="contained"
        onClick={() => {
          document.getElementById("examen").click()
        } }
      >
        Add Exam
      </Button>
      {files.examen.map((pdf, key) => (
        <Tooltip key={key} title={pdf.name}>
          <CardMedia
            component="img"
            style={{ width: "25%" }}
            image="assets/images/pdf.png" />
        </Tooltip>
      ))}
    </div>
  </Stack>
}