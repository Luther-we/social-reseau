const ROOT = 'WALL'
export const SAVE_ALL_USER = `${ROOT}/SAVE_ALL_USER`

export const saveAllUser = (data) => dispatch => {
    dispatch ({
        type: SAVE_ALL_USER,
        data
    })
}
