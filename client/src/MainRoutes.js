import React from 'react'
import HomePage from "./pages/HomePage/HomePage"

import AdminPage from "./pages/Admin/AdminPage"
import TeachersPage from "./pages/Teachers/TeachersPage"
import CoursesPage from "./pages/Courses/CoursesPage"
import UploadCoursePage from "./pages/UploadCourse/UploadCoursePage"
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {  useDispatch } from "react-redux"

import { findStudents } from "./store/actions/student"
import { findTeachers } from "./store/actions/teacher"
import { findBranches } from "./store/actions/branch"
import { findClasses } from "./store/actions/class"
import { useEffect } from "react"
import { findCourses } from './store/actions/course'

function MainRoutes() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findStudents())
    dispatch(findTeachers())
    dispatch(findBranches())
    dispatch(findClasses())
    dispatch(findCourses())
  }, [])
  return (
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot_password" element={<ForgotPasswordPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/uploadCourse" element={<UploadCoursePage />} />
      </Routes>
      </BrowserRouter>
     
  )
}

export default MainRoutes