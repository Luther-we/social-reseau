import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Field, reduxForm} from 'redux-form'
import {compose} from 'redux'
import {connect} from 'react-redux'

import {Button, withStyles, Paper} from '@material-ui/core'

import {submitLogin} from './services/loginFormActions'
import PasswordPut from '../../component/input/PasswordPut'
import TextInput from '../../component/input/TextInput'
import Title from '../../component/typography/Title'
import Caption from '../../component/typography/Caption'
import appConst from '../../utilities/appConst'
import {buttonValidateFormStyle, paperFormStyle, buttonNewAccount, divWrapper} from '../../utilities/styleConst'
import devConst from "../../utilities/devConst";


const validate = (values) => {
    const errors = {}

    if (!appConst.regExEmail.test(values.email)) {
        errors.email= 'error.email'
    }

    errors.password = values.password ? '' : 'error.passwordRequire'

    return errors
}

const styles = theme => ({
    paperStyle: paperFormStyle,
    buttonValidate: buttonValidateFormStyle,
    buttonNewAccount: buttonNewAccount,
    divWrapper: divWrapper
})

const handdleClickNewAccount = () => {
    window.location.href= devConst.dev ? `http://${appConst.adresse}:3000/#/createAccount` : `http://${appConst.adresse}:${appConst.port}/#/createAccount`
}

class LoginForm
    extends PureComponent {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    submit = (values) => {
        this.disabledButton = true
        this.props.submitLogin(values)
    }

    disabledButton = false

    render() {
        const {classes} = this.props
        return (
            <div className={classes.divWrapper}>
            <Paper
                className={classes.paperStyle}
            >
                <Title idMessage ='title.connectTo'/>
                <form onSubmit={this.props.handleSubmit((values) => this.submit(values))}>
                    <Field
                        label='email'
                        name='email'
                        component={TextInput}
                    />
                    <br/>
                    < Field
                        label='password'
                        name='password'
                        component={PasswordPut}
                        control={true}
                    />
                    <br/>
                    < Button
                        type="submit"
                        disabled={this.disabledButton}
                        className={classes.buttonValidate}
                    > <FormattedMessage id='button.toConnect'/> </Button>
                </form>
            </Paper>
                <Caption idMessage='caption.noAccount'/>
                < Button
                    className={classes.buttonNewAccount}
                    onClick={() => handdleClickNewAccount()}
                > <FormattedMessage id='button.createAccount'/> </Button>
            </div>
        )
    }
}



const action = {
    submitLogin
}

const mapStateToProps = (state) => ({
})

export default compose(
    reduxForm({
        form: 'connect',
        validate
    }),
    connect(
        mapStateToProps,
        action
    ), withStyles(styles))(LoginForm)
