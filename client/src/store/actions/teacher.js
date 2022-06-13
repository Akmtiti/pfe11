import * as API from "src/api"
import * as actionType from '../constants';

export const findTeacher = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_TEACHER })
    const { data } = await API.findTeacher(id)
    dispatch({ type: actionType.SET_TEACHER, payload: data })
    dispatch({ type: actionType.END_LOADING_TEACHER })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_TEACHER })
    const { data } = await API.findTeachers()
    dispatch({ type: actionType.SET_TEACHERS, payload: data })
    dispatch({ type: actionType.END_LOADING_TEACHER })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createTeacher = (newTeacher) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_TEACHER })
    const { data } = await API.createTeacher(newTeacher)
    dispatch({ type: actionType.ADD_TEACHER, payload: data })
    dispatch({ type: actionType.END_LOADING_TEACHER })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateTeacher = (id, updatedTeacher) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_TEACHER })
    const { data } = await API.updateTeacher(id, updatedTeacher)
    dispatch({ type: actionType.UPDATE_TEACHER, payload: data })
    dispatch({ type: actionType.END_LOADING_TEACHER })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_TEACHER })
    await API.deleteTeacher(id)
    dispatch({ type: actionType.DELETE_TEACHER, payload: id })
    dispatch({ type: actionType.END_LOADING_TEACHER })
  } catch (error) {
    return Promise.reject(error)
  }
}
