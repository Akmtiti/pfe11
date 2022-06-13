import * as API from "src/api"
import * as actionType from "../constants"

export const findClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_CLASS })
    const { data } = await API.findClass(id)
    dispatch({ type: actionType.SET_CLASS, payload: data })
    dispatch({ type: actionType.END_LOADING_CLASS })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findClasses = (filters, fields) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_CLASS })
    const { data } = await API.findClasses(filters, fields)
    dispatch({ type: actionType.SET_CLASSES, payload: data })
    dispatch({ type: actionType.END_LOADING_CLASS })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createClass = (newClass) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_CLASS })
    const { data } = await API.createClass(newClass)
    dispatch({ type: actionType.ADD_CLASS, payload: data })
    dispatch({ type: actionType.END_LOADING_CLASS })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateClass = (id, updatedClass) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_CLASS })
    const { data } = await API.updateClass(id, updatedClass)
    dispatch({ type: actionType.UPDATE_CLASS, payload: data })
    dispatch({ type: actionType.END_LOADING_CLASS })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_CLASS })
    await API.deleteClass(id)
    dispatch({ type: actionType.DELETE_CLASS, payload: id })
    dispatch({ type: actionType.END_LOADING_CLASS })
  } catch (error) {
    return Promise.reject(error)
  }
}
