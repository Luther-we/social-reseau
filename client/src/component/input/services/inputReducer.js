import {SET_SHOW_PASSWORD} from './inputActions'

const local = {
    showPassword: false
}

const input = (state = local, actions) => {
    switch (actions.type) {
        case SET_SHOW_PASSWORD :
            console.log('yes 2')
                return {
                    ...state,
                    showPassword: !state.showPassword
                }
        default :
            return state
    }
}

export default input