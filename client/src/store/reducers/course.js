import * as actionType from "../constants"
export const course = (
  state = {
    course: {},
    courses: [],
    loadingCourse : false
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.LOADING_COURSE:
      return { ...state, course: true }

    case actionType.END_LOADING_COURSE:
      return { ...state, course: false }

    case actionType.SET_COURSE:
      return { ...state, course: payload }
    
    case actionType.SET_COURSES:
      return { ...state, courses: payload }

    case actionType.ADD_COURSE:
      return {
        ...state,
        courses: [payload,...state.courses],
      }

    case actionType.UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((course) =>
          course._id === payload._id ? payload : course
        ),
      }

    case actionType.DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== payload
        ),
      }

    default:
      return state
  }
}


