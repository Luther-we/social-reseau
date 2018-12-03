const ROOT = 'AUTH'
export const SAVE_EMAIL = `${ROOT}/SAVE_EMAIL`

export const saveEmail = (email) => dispatch => {
    dispatch ({
        type: SAVE_EMAIL,
        email
    })
}
