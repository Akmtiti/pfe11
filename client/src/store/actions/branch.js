import * as API from "src/axios"
import * as actionType from '../constants';


export const findBranch = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_BRANCH })
    const { data } = await API.findBranch(id)
    dispatch({ type: actionType.SET_BRANCH, payload: data })
    dispatch({ type: actionType.END_LOADING_BRANCH })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findBranches = (filters, fields) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_BRANCH })
    const { data } = await API.findBranches(filters, fields)
    dispatch({ type: actionType.SET_BRANCHES, payload: data })
    dispatch({ type: actionType.END_LOADING_BRANCH })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createBranch = (newBranch) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_BRANCH })
    const { data } = await API.createBranch(newBranch)
    dispatch({ type: actionType.ADD_BRANCH, payload: data })
    dispatch({ type: actionType.END_LOADING_BRANCH })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateBranch = (id, updatedBranch) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_BRANCH })
    const { data } = await API.updateBranch(id, updatedBranch)
    dispatch({ type: actionType.UPDATE_BRANCH, payload: data })
    dispatch({ type: actionType.END_LOADING_BRANCH })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteBranch = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.LOADING_BRANCH })
    await API.deleteBranch(id)
    dispatch({ type: actionType.DELETE_BRANCH, payload: id })
    dispatch({ type: actionType.END_LOADING_BRANCH })
  } catch (error) {
    return Promise.reject(error)
  }
}
