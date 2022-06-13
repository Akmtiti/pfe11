import * as API from "src/api"
import * as actionType from "../constants"
export const findCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_COURSE })
    const { data } = await API.findCourse(id)
    dispatch({ type: actionType.SET_COURSE, payload: data })
    dispatch({ type: actionType.END_LOADING_COURSE })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findCourses = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_COURSE })
    const { data } = await API.findCourses()
    dispatch({ type: actionType.SET_COURSES, payload: data })
    dispatch({ type: actionType.END_LOADING_COURSE })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createCourse = (newCourse) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_COURSE })
    const { data } = await API.createCourse(newCourse)
    dispatch({ type: actionType.ADD_COURSE, payload: data })
    dispatch({ type: actionType.END_LOADING_COURSE })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateCourse = (id, updatedCourse) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_COURSE })
    const { data } = await API.updateCourse(id, updatedCourse)
    dispatch({ type: actionType.UPDATE_COURSE, payload: data })
    dispatch({ type: actionType.END_LOADING_COURSE })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_COURSE })
    await API.deleteCourse(id)
    dispatch({ type: actionType.DELETE_COURSE, payload: id })
    dispatch({ type: actionType.END_LOADING_COURSE })
  } catch (error) {
    return Promise.reject(error)
  }
}
