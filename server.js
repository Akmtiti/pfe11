// require("crypto").randomBytes(64).toString("hex")

import app from "./config.js"

import authenticateToken from "./middleware/authenticateToken.js"
import { deleteToken } from "./controllers/manageAccessToken.js"
import { verifyToken } from "./controllers/manageAccessToken.js"
import userRouter from "./routes/user.js"
import  { CourseRoutes } from "./routes/course.js"
import reviewRouter from "./routes/review.js"
import contactUsRouter from "./routes/contactUs.js"
import customRouter from "./routes/custom.js"
import  { teacherRoutes } from "./routes/teacher.js"
import { branchRoutes } from "./routes/branch.js"
import { classRoutes } from "./routes/class.js"
import { studentRoutes } from './routes/student.js';



// Manage Token
verifyToken()
deleteToken()

// Middleware: Check authorized Access
// app.use(authenticateToken)

app.use("/user",userRouter)
app.use(reviewRouter)
app.use(contactUsRouter)
app.use(customRouter)


app.use("/course", CourseRoutes)
app.use("/student", studentRoutes)
app.use("/teacher", teacherRoutes)
app.use("/branches", branchRoutes)
app.use("/class", classRoutes)
