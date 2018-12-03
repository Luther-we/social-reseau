import {
    CLOSE_NOTIFICATION_BAR,
    OPEN_NOTIFICATION_BAR_ERROR,
    OPEN_NOTIFICATION_BAR_VALID
} from './notificationBarActions'

const local = {
    open: false,
    variant: 'success',
    message: 'empty',
    duration: 6000
}

const notificationBarReducer = (state = local, actions ) => {
    switch (actions.type) {
        case CLOSE_NOTIFICATION_BAR:
            console.log('Jusque encore là')
            return {
                ...state,
                open: false,
                duration: 6000
            }
        case OPEN_NOTIFICATION_BAR_ERROR:
            return {
                ...state,
                open: true,
                message: actions.idMessage,
                variant: 'error',
                duration: 10000
            }
        case OPEN_NOTIFICATION_BAR_VALID:
            return {
                ...state,
                open: true,
                message: actions.idMessage,
                variant: 'success',
                duration: 3000
            }
        default:
            return state
    }
}

export default notificationBarReducer