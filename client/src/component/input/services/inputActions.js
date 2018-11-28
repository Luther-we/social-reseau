const ROOT = 'INPUT'
export const SET_SHOW_PASSWORD = `${ROOT}/SET_SHOW_PASSWORD`

export const setShowPassword = () => dispatch => {
    dispatch({
        type : SET_SHOW_PASSWORD
    })
}