import {ERROR_SUBMIT, SUBMIT_LOGIN, SUCCES_SUBMIT} from './loginFormActions'

const local = {
    disabled: false,
    test: true
}

const loginFormReducer = (state = local, action) => {
    switch (action.type)  {
        case SUBMIT_LOGIN :
            return {
                ...state,
                test: false
            }
        case SUCCES_SUBMIT :
            return {
                ...state,
                test: 'bonjour'
            }
        case ERROR_SUBMIT :
            return {
                ...state
            }
        default :
            return state
    }
}

export default loginFormReducer