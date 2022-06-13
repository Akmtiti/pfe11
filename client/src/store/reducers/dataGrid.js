import * as actionType from '../constants';

const dataGrid = (
  state = {
    selectedRow: null,
    feedbackObject: {},
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.SET_SELECTED_ROW:
      return { ...state, selectedRow: payload }
    case actionType.SET_FEEDBACK_OBJECT:
      return { ...state, feedbackObject: payload }

    default:
      return state
  }
}
export default dataGrid
// dispatch({type :UNREAD_MESSAGES, payload : { scheme: "fetchedUsersData", ...userFormData } })
