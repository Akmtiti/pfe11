import React from "react"
import ReactDOM from "react-dom/client";

import HomePage from "./pages/HomePage/HomePage"
import "./styles.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminPage from "./pages/Admin/AdminPage"
import { store } from "./store/store"
import { Provider } from "react-redux"
import TeachersPage from "./pages/Teachers/TeachersPage"
import CoursesPage from "./pages/Courses/CoursesPage"
import UploadCoursePage from "./pages/UploadCourse/UploadCoursePage"
const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/uploadCourse" element={<UploadCoursePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

root.render(<App />)
