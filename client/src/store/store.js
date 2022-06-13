import { applyMiddleware, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { branch } from "./reducers/branch"
import { classReducer } from "./reducers/class"
import dataGrid from "./reducers/dataGrid"

import notification from "./reducers/notification"
import scheme from "./reducers/scheme"
import { student } from "./reducers/student"
import { teacher } from "./reducers/teacher"
import user from "./reducers/user"

export const store = configureStore(
  {
    reducer: {
      notification: notification,
      user: user,
      scheme: scheme,
      branch: branch,
      dataGrid: dataGrid,
      class: classReducer,
      student: student,
      teacher: teacher,
    },
  },
  applyMiddleware(thunk)
)
