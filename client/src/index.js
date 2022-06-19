import React from "react"
import ReactDOM from "react-dom/client"

import "./app.css"
import { store } from "./store/store"
import { Provider } from "react-redux"

import MainRoutes from "./MainRoutes"
import SnackbarFeedback from "./globalComponents/SnackbarFeedback"
import Footer from "./globalComponents/Footer"
import Header from "./globalComponents/Header"

const App = () => {

  
  return (
    <Provider store={store}>
      <SnackbarFeedback />
      <Header />
     <div  style={{ minHeight: "100vh" }}>
       <MainRoutes />
     </div>
      <Footer />
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
