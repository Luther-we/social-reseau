import {SAVE_USER} from './appAction'

const local = {
    user : {
        firstname: '',
        lastname: '',
        email: '',

    }
}

const userReducer = (state = local, action) => {
    switch (action.type) {
        case SAVE_USER:
            const data = action.data
            console.log('YEPAPAPAPA', data)
            return {
                ...state,
                firstname: data.firstname,
                lastname: data.lastname,
                birthday: data.age,
                gender: data.gender,
                email: data.email,
                pseudo: data.pseudo,
                rule: data.rule,
                userId: data.userId,
                city: data.city,
                zipCode: data.zipCode,
                cellPhone: data.cellPhone
            }
        default:
            return state
    }
}

export default userReducer