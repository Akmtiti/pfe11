import * as actionType from "../actions"
const notification = (
  state = {
    deviceNotification: 0,
    messageNotification: 0,
    unreadConversation: [], // List of users ID (Strings)
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.SET_DEVICE_NOTIFICATION:
      return { ...state, deviceNotification: payload }
    case actionType.ADD_DEVICE_NOTIFICATION:
      return { ...state, deviceNotification: state.deviceNotification +1 }
    case actionType.SET_MESSAGE_NOTIFICATION:
      return { ...state, messageNotification: payload }
    case actionType.SET_UNREAD_CONVERSATION:
      return { ...state, unreadConversation: payload }
    case actionType.PUSH_TO_UNREAD_CONVERSATION:
      // If userId already in list
      if (state.unreadConversation.indexOf(payload) !== -1) return state

      return {
        ...state,
        unreadConversation: [...state.unreadConversation, payload],
      }
    case actionType.PULL_FROM_UNREAD_CONVERSATION:
      return {
        ...state,
        unreadConversation: state.unreadConversation.filter(
          (userId) => userId !== payload
        ),
      }

    default:
      return state
  }
}

export default notification
// dispatch({type :UNREAD_MESSAGES, payload : 0 })
