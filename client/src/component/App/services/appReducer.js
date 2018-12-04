import {SAVE_USER, SET_USER_FRIENDS} from './appAction'
import devConst from '../../../utilities/devConst'

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
                cellPhone: data.cellPhone,
                profileCover: data.profileCover,
                profilePicture: data.profilePicture,
                friends: devConst.simFriends
            }
        case SET_USER_FRIENDS:
            return {
                ...state,
                friends: action.data
            }
        default:
            return state
    }
}

export default userReducer