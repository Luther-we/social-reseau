import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ConnectForm from '../LoginForm/LoginForm'
import devConst from '../../utilities/devConst'


class LoginPage extends PureComponent {

    componentWillMount() {
        if (devConst.token) {
            if (devConst.user) {
                window.location.href = 'http://localhost:3000/#/profil'
            } else {
                console.log('We need a user in state VIA Login Page ')
            }
        }
    }

    // if (token) {
    //     callServer(token)
    //         .then(response => {
    //             if (response.user) {
    //                 completeUser(response)
    //             } else {
    //                 currentPage='connectForm'
    //             }
    //         })
    //         .catch(e => console.log(e))
    // } else {
    //     currentPage='connectForm'
    // }

    render() {
        const {children} = this.props
        return (
            <div>
                {children}
            </div>
        )
    }
}

const actions = {
}

LoginPage.propTypes = {
}

const mapStateToProps = state => {
}

export default connect(mapStateToProps, actions)(LoginPage)
