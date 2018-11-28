const ROOT = 'NOTIFICATION_BAR'
export const CLOSE_NOTIFICATION_BAR = `${ROOT}/CLOSE_NOTIFICATION_BAR`

export const closeNotificationBar = () => dispatch => {
    console.log("Jusquici")
    dispatch ({
        type: CLOSE_NOTIFICATION_BAR
    })
}
