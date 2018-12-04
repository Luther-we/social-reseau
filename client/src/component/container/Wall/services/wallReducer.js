import {SAVE_ALL_USER} from './wallActions'
import appConst from "../../../../utilities/appConst";

const local = {
    allUser: []
}

const wallReducer = (state = local, action) => {
    switch (action.type) {
        case SAVE_ALL_USER:
            const data = action.data
            const tabInter = []
            data.map(elem => {
                let obj= {
                    pseudo: elem.pseudo || 'jDoe',
                    firstname: elem.firstname || 'John',
                    lastname: elem.lastname || 'Doe',
                    profilePicture: elem.profilePicture || appConst.defaultProfilePicture,
                    userId: elem.userId || '_2b54gk1ij'
                }
                tabInter.push(obj)
            })
            return {
                ...state,
                allUser: tabInter
            }
        default:
            return state
    }
}

export default wallReducer
