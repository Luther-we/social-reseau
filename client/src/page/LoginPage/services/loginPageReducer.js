import {COMPLETE_USER} from './loginPageActions'

const local = {
    user: {},
    settings: {},
    currentPage: 'login'
}

const login = {state = local, actions} => {
    switch (actions.type) {
        case COMPLETE_USER :
            const userData = response.user
            return {
                ...state,
                user: {
                    pseudo: userData.pseudo
                }
                settings: {
                    lang : userData.language
                }
                currentPage: 'profil'
            }

    }
}