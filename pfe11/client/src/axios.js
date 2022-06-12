import axios from "axios"

var baseURL
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8001"
} else {
  baseURL = "https://tunisian-event.herokuapp.com"
  //  baseURL = 'http://tunisia-events.com'
}

export const API = axios.create({
  baseURL: baseURL,
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  }
  return req
})

/* //! ----------- Branch -------------- */
export const findBranch = (id) => API.get(`/branches/findOne/${id}`)

export const findBranches = (filters, fields) =>
  API.post("/branches/findAll", { filters: filters, fields: fields })

export const createBranch = (newBranch) =>
  API.post("/branches/create", newBranch)

export const updateBranch = (id, updatedBranch) =>
  API.patch(`/branches/update/${id}`, updatedBranch)

export const deleteBranch = (id) => API.delete(`/branches/delete/${id}`)
