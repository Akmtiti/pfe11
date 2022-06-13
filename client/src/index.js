import React from "react"
import ReactDOM from "react-dom/client";

import "./app.css"
import { store } from "./store/store"
import { Provider, } from "react-redux"

import MainRoutes from "./MainRoutes"
const root = ReactDOM.createRoot(document.getElementById("root"));



const App = () => {
 

  return (
    <Provider store={store}>
     <MainRoutes />
    </Provider>
  )
}

root.render(<App />)
