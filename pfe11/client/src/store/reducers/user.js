import * as actionType from "../actions"
const user = (
  state = {
    feedback: "",
    fetchedUsersData: [], // List of users (privilege : Teachers / Students)
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.SET_FETCHED_USERS_DATA:
      return { ...state, fetchedUsersData: payload }
    case actionType.PUSH_FETCHED_USERS_DATA:
      return {
        ...state,
        fetchedUsersData: [...state.fetchedUsersData, payload],
      }
    case actionType.PULL_FETCHED_USERS_DATA:
      return {
        ...state,
        fetchedUsersData: state.fetchedUsersData.filter(
          (user) => user._id !== payload._id
        ),
      }
    case actionType.UPDATE_FETCHED_USERS_DATA:
      return {
        ...state,
        fetchedUsersData: state.fetchedUsersData.map((user) => {
          if (user._id === payload._id) return payload
          return user
        }),
      }
    case actionType.SET_USER_FEEDBACK:
      return {
        ...state,
        feedback: payload,
      }

    default:
      return state
  }
}

export default user
// dispatch({type :UNREAD_MESSAGES, payload : 0 })
