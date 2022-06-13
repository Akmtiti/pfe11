import * as actionType from "../constants"
export const teacher = (
  state = {
    teacher: {},
    teachers: [],
    loadingTeacher : false
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.LOADING_TEACHER:
      return { ...state, teacher: true }

    case actionType.END_LOADING_TEACHER:
      return { ...state, teacher: false }

    case actionType.SET_TEACHER:
      return { ...state, teacher: payload }
    
    case actionType.SET_TEACHERS:
      return { ...state, teachers: payload }

    case actionType.ADD_TEACHER:
      return {
        ...state,
        teachers: [payload,...state.teachers ],
      }

    case actionType.UPDATE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.map((teacher) =>
          teacher._id === payload._id ? payload : teacher
        ),
      }

    case actionType.DELETE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(
          (teacher) => teacher._id !== payload
        ),
      }

    default:
      return state
  }
}


