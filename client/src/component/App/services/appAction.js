const ROOT = 'APP'
export const SAVE_USER = `${ROOT}/SAVE_USER`

export const saveUser = (data) => dispatch => {
    console.log('calling')
    dispatch ({
        type: SAVE_USER,
        data
    })
}