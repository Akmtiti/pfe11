import  * as  API from '../../api'
import * as actionType from '../constants';

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData);
    dispatch({ type: actionType.AUTH, payload : data });
  } catch (error) {
    dispatch({ type: actionType.AUTH_ERROR, error });
    return Promise.reject(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    dispatch({ type: actionType.AUTH, data });
  } catch (error) {
    dispatch({ type: actionType.AUTH_ERROR, error });
    return Promise.reject(error);
  }
};

// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     const { data } = await API.forgotPassword(email);
//     dispatch({ type: actionType.FORGOT_PASSWORD, data });
//   } catch (error) {
//     dispatch({ type: actionType.AUTH_ERROR, error });
//   }
// };

// export const resetPassword = (formData, navigate) => async (dispatch) => {
//   try {
//     const { data } = await API.resetPassword(formData);
//     dispatch({ type: actionType.RESET_PASSWORD, data });
//     navigate("/auth");
//   } catch (error) {
//     dispatch({ type: actionType.AUTH_ERROR, error });
//   }
// };
