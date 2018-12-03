const ROOT = 'NOTIFICATION_BAR'
export const CLOSE_NOTIFICATION_BAR = `${ROOT}/CLOSE_NOTIFICATION_BAR`
export const OPEN_NOTIFICATION_BAR_ERROR = `${ROOT}/OPEN_NOTIFICATION_BAR_ERROR`
export const OPEN_NOTIFICATION_BAR_VALID = `${ROOT}/OPEN_NOTIFICATION_BAR_VALID`

export const closeNotificationBar = () => dispatch => {
    console.log("Jusquici")
    dispatch ({
        type: CLOSE_NOTIFICATION_BAR
    })
}

export const openNotificationBarError = (idMessage) => dispatch => {
    console.log('action open notif ERROR call', idMessage)
    dispatch ({
        type: OPEN_NOTIFICATION_BAR_ERROR,
        idMessage
    })
}

export const openNotificationBarValid = (idMessage) => dispatch => {
    console.log('action open notif VALID call', idMessage)
    dispatch ({
        type: OPEN_NOTIFICATION_BAR_VALID,
        idMessage
    })
}