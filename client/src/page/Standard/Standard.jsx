import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Tooltip, Button, withStyles} from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import PriorityIcon from '@material-ui/icons/PriorityHigh'
import Dialog from '../../component/dialog/Dialog'
import MessageDialog from '../../component/dialog/MessageDialog'

const styles = theme => ({
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    absolute2: {
        position: 'absolute',
        bottom: theme.spacing.unit * 11,
        right: theme.spacing.unit * 3,
    },
    absolute3: {
        position: 'absolute',
        bottom: theme.spacing.unit * 20,
        right: theme.spacing.unit * 3,
    }
})

class Standard extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            openNotification: false,
            openMessage: false,
            openProfil: false,
            selectedValue: ''
        }
    }

    handleClick = (elem) => {
        console.log('call me')

        this.setState({[`open,${elem}`]: true})
    }

    handleClose = (value, elem) => {
        console.log('call me')
        this.setState({selectedValue: value, [`open,${elem}`]: false })
    }

    render() {
        const {classes} = this.props
        return(
            <div>
                <Tooltip title='Account'>
                    <Button onClick={() => this.handleClick("Profil")} variant="fab" color="primary" aria-label="Add" className={classes.absolute}>
                        <AccountIcon />
                    </Button>
                </Tooltip>
                <Tooltip title='Email'>
                    <Button onClick={() => this.handleClick("Email")} variant="fab" color="secondary" aria-label="Email" className={classes.absolute2}>
                        <EmailIcon />
                    </Button>
                </Tooltip>
                <Tooltip title='Notification'>
                    <Button onClick={() => this.handleClick("Notification")} variant="fab" color="secondary" aria-label="Notification" className={classes.absolute3}>
                        <PriorityIcon />
                    </Button>
                </Tooltip>
                <Dialog
                    selectedValue={this.state.selectedValue}
                    open={this.state.openNotification}
                    onClose={this.handleClose}
                />
                <MessageDialog
                    selectedValue={this.state.selectedValue}
                    open={this.state.openMessage}
                    onClose={this.handleClose}
                    groupMessageTab={[{label: 'Yoyo', avatar: 'http://www.lanouvellepme.fr/wp-content/uploads/2015/01/avatar-fred.jpg'}]}
                />

            </div>
        )
    }
}

const actions = {

}

const mapStateToProps = state => {

}

Standard.propTypes = {

}

export default compose( connect(mapStateToProps, actions), withStyles(styles))(Standard)
