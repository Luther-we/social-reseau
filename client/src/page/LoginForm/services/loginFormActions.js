const ROOT = 'LOGIN_FORM'
export const SUBMIT_LOGIN = `${ROOT}/SUBMIT_LOGIN`

export const submitLogin = (value) => dispatch => {

}




//     import * as api from './userProfilePageApi'
//
// const ROOT = 'USER_PROFILE_PAGE'
// export const SAVE_USER = `${ROOT}/SAVE_USER`
// export const SUCCES_SUBMIT = `${ROOT}/SUCCES_SUBMIT`
// export const ERROR_SUBMIT = `${ROOT}/ERROR_SUBMIT`
//
// export const saveUser = (value) => dispatch => {
//     dispatch({
//         type: SAVE_USER,
//         value
//     })
//     return api.saveUser(value)
//         .then((data) => {
//             dispatch({
//                 type: SUCCES_SUBMIT,
//                 data
//             })
//         })
//         .catch((e) => {
//             dispatch({
//                 type: ERROR_SUBMIT,
//                 data: e
//             })
//             throw e
//         })
// }