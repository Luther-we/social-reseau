import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import completeUser from './services/loginPageActions'
import ConnectForm from '../LoginForm/LoginForm'
import {AppBar} from "@material-ui/core";



class LoginPage extends PureComponent {

componentWillMount() {
    if (user && user.token && user.token !== ''){
        this.props.currentPage= 'wall'
    } else {
        const token = window.localStorage.getItem('token') || null
        if (token === null) {
            this.props.currentPage= 'login'
        } else {
            setUserToken(token)
        }
    }
}

    if (token) {
        callServer(token)
            .then(response => {
                if (response.user) {
                    completeUser(response)
                } else {
                    currentPage='connectForm'
                }
            })
            .catch(e => console.log(e))
    } else {
        currentPage='connectForm'
    }

    render() {
        const {currentPage} = this.props
        switch (currentPage) {
            case 'connectForm':
                return (
                   <ConnectForm/>
                )
            case 'profil':
                return (
                    <Profil/>
                )
        }

    }
}

const actions = {
    completeUser
}

LoginPage.propTypes = {
    completeUser: PropTypes.bool.isRequired
}
const mapStateToProps = state => {
    currentPage: state.currentPage
}

export default connect(mapStateToProps, actions)(LoginPage)
