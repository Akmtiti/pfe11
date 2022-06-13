// require("crypto").randomBytes(64).toString("hex")

import app from "./config.js"

import recoverPassword from "./controllers/recoverPassword.js"
import authenticateToken from "./middleware/authenticateToken.js"
import { deleteToken } from "./controllers/manageAccessToken.js"
import { verifyToken } from "./controllers/manageAccessToken.js"
import userRouter from "./routes/user.js"
import courseRouter from "./routes/course.js"
import teacherRouter from "./routes/teacher.js"
import reviewRouter from "./routes/review.js"
import contactUsRouter from "./routes/contactUs.js"
import customRouter from "./routes/custom.js"
import { branchRoutes } from "./routes/branch.js"

// Restore password
recoverPassword(app)

// Manage Token
verifyToken()
deleteToken()

// Middleware: Check authorized Access
// app.use(authenticateToken)

app.use(userRouter)
app.use(courseRouter)
app.use(teacherRouter)
app.use(reviewRouter)
app.use(contactUsRouter)
app.use(customRouter)
app.use("/branches", branchRoutes)
