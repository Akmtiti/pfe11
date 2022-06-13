import * as API from "src/api"
import * as actionType from '../constants';


export const findStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_STUDENT })
    const { data } = await API.findStudent(id)
    dispatch({ type: actionType.SET_STUDENT, payload: data })
    dispatch({ type: actionType.END_LOADING_STUDENT })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findStudents = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_STUDENT })
    const { data } = await API.findStudents()
    dispatch({ type: actionType.SET_STUDENTS, payload: data })
    dispatch({ type: actionType.END_LOADING_STUDENT })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createStudent = (newStudent) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_STUDENT })
    const { data } = await API.createStudent(newStudent)
    dispatch({ type: actionType.ADD_STUDENT, payload: data })
    dispatch({ type: actionType.END_LOADING_STUDENT })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateStudent = (id, updatedStudent) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_STUDENT })
    const { data } = await API.updateStudent(id, updatedStudent)
    dispatch({ type: actionType.UPDATE_STUDENT, payload: data })
    dispatch({ type: actionType.END_LOADING_STUDENT })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_STUDENT })
    await API.deleteStudent(id)
    dispatch({ type: actionType.DELETE_STUDENT, payload: id })
    dispatch({ type: actionType.END_LOADING_STUDENT })
  } catch (error) {
    return Promise.reject(error)
  }
}
