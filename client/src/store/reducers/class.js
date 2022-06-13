import * as actionType from '../constants';
export const classReducer = (
  state = {
    class: {},
    classes: [],
    loadingClass : false
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.LOADING_CLASS:
      return { ...state, class: true }

    case actionType.END_LOADING_CLASS:
      return { ...state, class: false }

    case actionType.SET_CLASS:
      return { ...state, class: payload }
    
    case actionType.SET_CLASSES:
      return { ...state, classes: payload }

    case actionType.ADD_CLASS:
      return {
        ...state,
        classes: [payload,...state.classes, ],
      }

    case actionType.UPDATE_CLASS:
      return {
        ...state,
        classes: state.classes.map((classe) =>
          classe._id === payload._id ? payload : classe
        ),
      }

    case actionType.DELETE_CLASS:
      return {
        ...state,
        classes: state.classes.filter(
          (classe) => classe._id !== payload
        ),
      }

    default:
      return state
  }
}


