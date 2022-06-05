import * as actionType from "../actions"
const scheme = (
  state = {
    feedback: "",
    fetchedUsersData: [], // List of users (privilege : Teachers / Students)
    fetchedBranchData: [],
    fetchedClassData: [],
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.SET_FETCHED_DATA:
      return { ...state, ...payload }

    case actionType.PUSH_FETCHED_DATA:
      return {
        ...state,
        [payload.scheme]: [...state[payload.scheme], payload],
      }
    case actionType.PULL_FETCHED_DATA:
      return {
        ...state,
        [payload.scheme]: state[payload.scheme].filter(
          (document) => document._id !== payload._id
        ),
      }
    case actionType.UPDATE_FETCHED_DATA:
      return {
        ...state,
        [payload.scheme]: state[payload.scheme].map((document) =>
          document._id === payload._id ? payload : document
        ),
      }
    case actionType.SET_FEEDBACK:
      return {
        ...state,
        feedback: payload,
      }

    default:
      return state
  }
}

export default scheme
// dispatch({type :UNREAD_MESSAGES, payload : { scheme: "fetchedUsersData", ...userFormData } })
