import { applyMiddleware, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { branch } from "./reducers/branch"
import dataGrid from "./reducers/dataGrid"

import notification from "./reducers/notification"
import scheme from "./reducers/scheme"
import user from "./reducers/user"

export const store = configureStore(
  {
    reducer: {
      notification: notification,
      user: user,
      scheme: scheme,
      branch: branch,
      dataGrid: dataGrid,
    },
  },
  applyMiddleware(thunk)
)
