import * as actionType from '../constants';
export const branch = (
  state = {
    branch: {},
    branches: [],
    loadingBranch : false
  },
  action
) => {
  const payload = action.payload
  switch (action.type) {
    case actionType.LOADING_BRANCH:
      return { ...state, branch: true }

    case actionType.END_LOADING_BRANCH:
      return { ...state, branch: false }

    case actionType.SET_BRANCH:
      return { ...state, branch: payload }
    
    case actionType.SET_BRANCHES:
      return { ...state, branches: payload }

    case actionType.ADD_BRANCH:
      return {
        ...state,
        branches: [...state.branches, payload],
      }

    case actionType.UPDATE_BRANCH:
      return {
        ...state,
        branches: state.branches.map((branch) =>
          branch._id === payload._id ? payload : branch
        ),
      }

    case actionType.DELETE_BRANCH:
      return {
        ...state,
        branches: state.branches.filter(
          (branch) => branch._id !== payload
        ),
      }

    default:
      return state
  }
}


