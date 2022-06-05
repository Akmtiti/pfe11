import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Button, CardActionArea, CardActions } from "@mui/material"
import TeacherDialog from "./TeacherDialog"

export default function TeacherCard(props) {

  return (
    <Card sx={{ maxWidth: 345 }}
      // onClick={handleDisplayModel}
    >
        <CardMedia
          component="img"
          // height="140"
          image="assets/images/inconnue.jpg"
          alt="Teacher"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.teacher.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque omnis quae, labore iusto porro sapiente voluptatum atque optio corporis illo dolores voluptate eveniet tempore beatae deleniti iure nobis facere est?
          </Typography>
        </CardContent>
      <CardActions>
        <TeacherDialog {...props} />
      </CardActions>
    </Card>
  )
}
