import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Snackbar, Button, IconButton, withStyles} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {closeNotificationBar} from './services/notificationBarActions'


const styles = theme => ({
    test: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.main
    }
})



class NotificationBar extends PureComponent {

    handleClose = (e) => {
        this.props.closeNotificationBar()
        console.log('YEPA ', e)
    }


    render () {
        const { dataNotificationBar, classes } = this.props
        console.log('WELCOME BIO', dataNotificationBar)
        return (
            <Snackbar
                className={classes.test}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={dataNotificationBar.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Note archived</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                        UNDO
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        )
    }
}

const mapStateToProps = state => ({
    dataNotificationBar: state.notificationBar
})

const actions = {
    closeNotificationBar
}

export default compose(
    connect(mapStateToProps, actions),
    withStyles(styles)
)(NotificationBar)