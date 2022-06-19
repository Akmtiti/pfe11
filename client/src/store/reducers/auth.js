import * as actionType from "../constants"

const auth = (state = { authData: null, error: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("user", JSON.stringify(action.payload))
      return { ...state, authData: action.payload, error: null }
    case actionType.AUTH_ERROR:
      console.log(action)
      return { ...state, error: action?.error?.response?.data?.message }
    case actionType.LOGOUT:
      localStorage.clear()
      return { ...state, authData: null }
    default:
      return state
  }
}

export default auth
