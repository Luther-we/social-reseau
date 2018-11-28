import {CLOSE_NOTIFICATION_BAR} from './notificationBarActions'

const local = {
    open: true,
    test: true
}

const notificationBarReducer = (state = local, actions ) => {
    switch (actions.type) {
        case CLOSE_NOTIFICATION_BAR:
            console.log('Jusque encore là')
            return {
                ...state,
                open: false
            }
        default:
            return state
    }
}

export default notificationBarReducer