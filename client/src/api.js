import axios from "axios"

var baseURL
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8001"
} else {
  // baseURL = ""
}

export const API = axios.create({
  baseURL: baseURL,
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`
  }
  return req
})

//! -------------- Auth ------------------ */

export const signIn = (formData) => API.post("/user/login", formData)

export const signUp = (formData) => API.post("/user/singup", formData)

export const forgotPassword = (email) => API.post(`/user/forgotPassword`, email)

export const resetPassword = (formData) => API.post(`/user/resetPassword`, formData)

export const logout = (id) => API.get(`/branches/findOne/${id}`)

/* //! ----------- Branch -------------- */
export const findBranch = (id) => API.get(`/branches/findOne/${id}`)

export const findBranches = () => API.get("/branches/findAll")

export const createBranch = (newBranch) =>
  API.post("/branches/create", newBranch)

export const updateBranch = (id, updatedBranch) =>
  API.patch(`/branches/update/${id}`, updatedBranch)

export const deleteBranch = (id) => API.delete(`/branches/delete/${id}`)

/* //! ----------- Class -------------- */
export const findClass = (id) => API.get(`/class/findOne/${id}`)

export const findClasses = (filters, fields) =>
  API.post("/class/findAll", { filters: filters, fields: fields })

export const createClass = (newClass) => API.post("/class/create", newClass)

export const updateClass = (id, updatedClass) =>
  API.patch(`/class/update/${id}`, updatedClass)

export const deleteClass = (id) => API.delete(`/class/delete/${id}`)

/* //! ----------- Student -------------- */
export const findStudent = (id) => API.get(`/student/findOne/${id}`)

export const findStudents = () => API.get("/student/findAll")

export const createStudent = (newStudent) =>
  API.post("/student/create", newStudent)

export const updateStudent = (id, updatedStudent) =>
  API.patch(`/student/update/${id}`, updatedStudent)

export const deleteStudent = (id) => API.delete(`/student/delete/${id}`)

/* //! ----------- Teacher -------------- */
export const findTeacher = (id) => API.get(`/teacher/findOne/${id}`)

export const findTeachers = () => API.get("/teacher/findAll")

export const createTeacher = (newTeacher) =>
  API.post("/teacher/create", newTeacher)

export const updateTeacher = (id, updatedTeacher) =>
  API.patch(`/teacher/update/${id}`, updatedTeacher)

export const deleteTeacher = (id) => API.delete(`/teacher/delete/${id}`)

/* //! ----------- Course -------------- */
export const findCourse = (id) => API.get(`/course/findOne/${id}`)

export const findCourses = () => API.get("/course/findAll")

export const getAllFiles = () => API.get("/course/getAllFiles")


export const createCourse = (newCourse) => API.post("/course/create", newCourse)

export const updateCourse = (id, updatedCourse) =>
  API.patch(`/course/update/${id}`, updatedCourse)

export const deleteCourse = (id) => API.delete(`/course/delete/${id}`)
