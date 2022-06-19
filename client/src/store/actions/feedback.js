import { SET_FEEDBACK_OBJECT } from "../constants"

export const feedbackSuccess = (feedback) => async (dispatch) =>
  dispatch({
    type: SET_FEEDBACK_OBJECT,
    payload: {
      feedback: feedback,
      severity: "success",
    },
  })

  export const feedbackError = (feedback) => async (dispatch) =>
  dispatch({
    type: SET_FEEDBACK_OBJECT,
    payload: {
      feedback: feedback,
      severity: "error",
    },
  })