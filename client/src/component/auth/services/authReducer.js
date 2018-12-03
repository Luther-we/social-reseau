import {SAVE_EMAIL} from './authAction'

const local = {
    email: ''
}

const authReducer = (state = local, action) => {
    switch (action.type) {
        case SAVE_EMAIL:
            return {
                ...state,
                email: action.email
            }
        default:
            return state
    }
}

export default authReducer