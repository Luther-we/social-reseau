import React, {PureComponent} from 'react'
import '../../App.css'

import {Button} from '@material-ui/core'

import AuthHelperMethods from '../auth/AuthHelperMethods'
import withAuth from '../auth/withAuth'
import AppBarSN from '../appBarSN/AppBarSN'

class App
    extends PureComponent {
    Auth = new AuthHelperMethods()

    _handleLogout = () => {
        this.Auth.logout()
        this.props.history.replace('/login');
    }

    render() {
        const {children} = this.props

        return (
            <div>
                <Button onClick={this._handleLogout}>LOGOUT</Button>
                {children}
                <AppBarSN
                    data = {this.props.confirm.username}
                />
            </div>
        )
    }
}



export default withAuth(App)