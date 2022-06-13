import * as actionType from '../constants';

export const student = (
  state = {
    student: {},
    students: [],
    loadingStudent : false
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.LOADING_STUDENT:
      return { ...state, student: true }

    case actionType.END_LOADING_STUDENT:
      return { ...state, student: false }

    case actionType.SET_STUDENT:
      return { ...state, student: payload }
    
    case actionType.SET_STUDENTS:
      return { ...state, students: payload }

    case actionType.ADD_STUDENT:
      return {
        ...state,
        students: [payload, ...state.students ],
      }

    case actionType.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === payload._id ? payload : student
        ),
      }

    case actionType.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== payload
        ),
      }

    default:
      return state
  }
}


