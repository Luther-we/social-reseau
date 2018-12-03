import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Field, reduxForm} from 'redux-form'
import {compose} from 'redux'
import {connect} from 'react-redux'

import {Button, withStyles, Paper} from '@material-ui/core'
import {openNotificationBarError, openNotificationBarValid} from '../notificationBar/services/notificationBarActions'

import PasswordPut from '../../component/input/PasswordPut'
import TextInput from '../../component/input/TextInput'
import Title from '../../component/typography/Title'
import Caption from '../../component/typography/Caption'
import appConst from '../../utilities/appConst'
import {buttonValidateFormStyle, paperFormStyle, buttonNewAccount, divWrapper} from '../../utilities/styleConst'
import {Link} from "react-router-dom";

import AuthHelperMethods from '../auth/AuthHelperMethods'

const validate = (values) => {
    const errors = {}
    if (!appConst.regExEmail.test(values.email)) {
        errors.email= 'error.email'
    }
    errors.password = values.password ? '' : 'error.passwordRequire'
    return errors
}

const styles = {
    paperStyle: paperFormStyle,
    buttonValidate: buttonValidateFormStyle,
    buttonNewAccount: buttonNewAccount,
    divWrapper: divWrapper
}

class LoginForm
    extends PureComponent {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    Auth = new AuthHelperMethods()

    submit = (e) => {
        this.Auth.login(e.email, e.password)
            .then(res => {
                console.log('Total eclipse....', res)
                if (res.success) {
                    this.props.openNotificationBarValid(res.idMessage)
                    this.props.history.replace("/");
                } else {
                    this.props.openNotificationBarError(res.idMessage)
                }
            })
            .catch(err => {
                console.log('Total eclipse....', err)
                alert(err);
            });
    }

    render() {
        const {classes} = this.props

        console.log('SAY ME ', this.props.history)
        return (
            <div className={classes.divWrapper}>
                <Paper
                    className={classes.paperStyle}
                >
                    <Title idMessage='title.connectTo'/>
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
                            // disabled={false}
                            className={classes.buttonValidate}
                        > <FormattedMessage id='button.toLogin'/> </Button>
                    </form>
                </Paper>
                <Caption idMessage='caption.noAccount'/>
                < Button
                    className={classes.buttonNewAccount}
                > <Link to="/signIn"><FormattedMessage id='button.signIn'/></Link> </Button>
            </div>
        )
    }
}

const action = {
    openNotificationBarError,
    openNotificationBarValid
}

const mapStateToProps = (state) => ({})

export default compose(
    reduxForm({
        form: 'connect',
        validate
    }),
    connect(
        mapStateToProps,
        action
    ), withStyles(styles))(LoginForm)
