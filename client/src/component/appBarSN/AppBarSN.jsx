import React, {PureComponent} from 'react'
import {
    AppBar,
    withStyles,
    Toolbar,
    Typography,
    Button,
    Tooltip,
    Badge,
    Menu,
    MenuItem
} from '@material-ui/core'

import EmailIcon from '@material-ui/icons/Email'
import PriorityIcon from '@material-ui/icons/PriorityHigh'
import AccountIcon from '@material-ui/icons/AccountCircle'
import AuthHelperMethods from "../auth/AuthHelperMethods";
import {saveUser} from '../App/services/appAction'
import {connect} from 'react-redux'
import {compose} from 'redux'

const style = {
    appBar: {
        marginBottom: 0,
        height: 40,
        top: 'auto',
        bottom: 0,
        width: '100%'
    },
    margin: {
        // margin: 'auto'
        marginBottom: 20,
        marginRight: 10,
        positon: 'absolute'
    },
    menu: {
        marginBottom: 40,
        transformOrigin: 40
    }
}

class AppBarSN
    extends PureComponent {
    state = {
        account: null,
        anchorEl: null,
    };

    Auth = new AuthHelperMethods()

    componentWillMount() {
        this.Auth.fetch('/getUser', {
            method: "POST",
            body: JSON.stringify({
                email: this.props.data
            })
        })
            .then(res => {
                this.props.saveUser(res.user);
                return Promise.resolve(res);
            })
            .catch(e => {console.log(e)})
    }

    handleMenu = (event, ref) => {
        this.setState({[`${ref}`]: event.currentTarget});
    };

    handleClose = (ref) => {
        this.setState({[`${ref}`]: null});
    };

    render() {
        const {classes, data} = this.props
        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.margin}
                    >
                        Social-Réseau
                    </Typography>
                    <Tooltip title='Account'>
                        <Button
                            onClick={(e) => this.handleMenu(e, 'account')}
                            color="secondary"
                            aria-label="Add"
                            className={classes.margin}
                        >
                            <AccountIcon
                            />
                        </Button>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.account}
                        className={classes.menu}
                        // anchorOrigin={{
                        //     vertical: 'bottom',
                        //     horizontal: 'left ',
                        //     marginBottom: 350
                        // }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(this.state.account)}
                        onClose={() => this.handleClose('account')}
                    >
                        <MenuItem onClick={this.handleClose}>Mon Compte</MenuItem>
                        <MenuItem onClick={this.handleClose}>Se déconnecter</MenuItem>
                    </Menu>
                    <Tooltip title='Messenger'>
                        <Button
                            onClick={() => this.handleClick("Email")}
                            color="secondary"
                            aria-label="Email"
                            className={classes.margin}
                        >
                            <Badge badgeContent={4} color="secondary">
                                <EmailIcon/>
                            </Badge>
                        </Button>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Mon Compte</MenuItem>
                        <MenuItem onClick={this.handleClose}>Se déconnecter</MenuItem>
                    </Menu>
                    <Tooltip
                        title='Notification'
                    >
                        <Button
                            size="small"
                            onClick={() => this.handleClick("Notification")}
                            color="secondary"
                            aria-label="Notification"
                            className={classes.margin}
                        >
                            <Badge badgeContent={4} color="secondary">
                                <PriorityIcon/>
                            </Badge>
                        </Button>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Mon Compte</MenuItem>
                        <MenuItem onClick={this.handleClose}>Se déconnecter</MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
        )
    }
}

const action = {
    saveUser
}

const mapStateToProps = state => ({
    user: state.user
})

export default compose (
    connect (mapStateToProps, action),
    withStyles(style)
)(AppBarSN)
