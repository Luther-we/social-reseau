const ROOT = 'LOGIN'
export const COMPLETE_USER = `${ROOT}/COMPLETE_USER`

export const completeUser = (response) => dispatch => {
    dispatch {
        type: COMPLETE_USER,
        response
    }
}