import { applyMiddleware, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import notification from "./reducers/notification"
import scheme from "./reducers/scheme"
import user from "./reducers/user"

export const store = configureStore(
  {
    reducer: {
      notification: notification,
      user: user,
      scheme: scheme,
    },
  },
  applyMiddleware(thunk)
)
