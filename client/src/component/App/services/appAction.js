const ROOT = 'APP'
export const SAVE_USER = `${ROOT}/SAVE_USER`
export const SET_USER_FRIENDS = `${ROOT}/SET_USER_FRIENDS`

export const saveUser = (data) => dispatch => {
    dispatch ({
        type: SAVE_USER,
        data
    })
}

export const setUserFriends = (data) => dispatch => {
    dispatch ({
        type: SET_USER_FRIENDS,
        data
    })
}