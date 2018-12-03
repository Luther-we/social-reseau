import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Field, reduxForm} from 'redux-form'
import {compose} from 'redux'
import {connect} from 'react-redux'

import {Button, withStyles, Paper} from "@material-ui/core"
import {openNotificationBarError, openNotificationBarValid} from '../notificationBar/services/notificationBarActions'


import PasswordPut from '../../component/input/PasswordPut'
import ConfirmPasswordPut from '../../component/input/ConfirmPasswordPut'
import TextInput from '../../component/input/TextInput'
import SelectPut from '../../component/input/SelectPut'
import appConst from '../../utilities/appConst'
import DatePut from '../../component/input/DatePut'
import Title from '../../component/typography/Title'
import {
    buttonNewAccount,
    buttonValidateFormStyle,
    divWrapper,
    paperFormStyle
} from '../../utilities/styleConst'

import AuthHelperMethods from '../auth/AuthHelperMethods'
import axios from "axios"
import {Link} from 'react-router-dom'

const validate = (values) => {
    const errors = {}
    errors.pseudo = values.pseudo ? '' : 'error.pseudoRequire'
    errors.firstname = values.firstname ? '' : 'error.firstnameRequire'
    errors.lastname = values.lastname ? '' : 'error.lastnameRequire'
    errors.password = values.password ? '' : 'error.passwordRequire'
    errors.confirmPassword = values.confirmPassword ? '' : 'error.confirmPasswordRequire'
    errors.email = values.email ? '' : 'error.email'
    errors.gender = values.gender ? '' : 'error.genderRequired'
    errors.age = values.age ? '' : 'error.ageRequired'
    errors.city = values.city ? '' : 'error.cityRequired'

    errors.password = appConst.regExPassword.test(values.password) ? errors.password = '' : 'error.passwordElement'
    errors.confirmPassword = values.password === values.confirmPassword ? '' : 'error.confirmPassword'
    errors.email = appConst.regExEmail.test(values.email) ? '' : 'error.email'
    errors.confirmEmail = values.email === values.confirmEmail ? '' : 'error.confirmEmail'
    return errors
}

const styles = theme => ({
    paperStyle: paperFormStyle,
    buttonValidate: buttonValidateFormStyle,
    buttonNewAccount: buttonNewAccount,
    divWrapper: divWrapper,
})

class SignIn
    extends PureComponent {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    Auth = new AuthHelperMethods()

    submit = (e) => {
        console.log(e)
        axios.post("/signup", {
            ...e
        })
            .then(data => {
                console.log('retour', data);
                if (data.data.error) {
                    this.props.openNotificationBarError(data.data.idMessage)
                } else {
                    this.props.openNotificationBarValid(data.data.idMessage)
                    this.props.history.replace("/login")
                }
            })
            .catch(e => {
                console.log('retour erreur', e)
            })
    }

    render() {
        const {classes, disabledButton} = this.props
        return (
            <div className={classes.divWrapper}>
                <Paper
                    className={classes.paperStyle}
                >
                    <Title idMessage='title.signIn'/>
                    <form
                        onSubmit={this.props.handleSubmit((values) => this.submit(values))}>
                        <Field
                        label='pseudo'
                        name='pseudo'
                        component={TextInput}
                        />
                        <Field
                            label='firstname'
                            name='firstname'
                            component={TextInput}
                        />
                        <Field
                            label='lastname'
                            name='lastname'
                            component={TextInput}
                        />
                        <Field
                            label='email'
                            name='email'
                            component={TextInput}
                        />
                        <Field
                            label='confirmEmail'
                            name='confirmEmail'
                            component={TextInput}
                        />
                        <br/>
                        <Field
                            label='gender'
                            name='gender'
                            component={SelectPut}
                            tabItem={appConst.genderTab}
                        />
                        <br/>
                        <Field
                            label='age'
                            name='age'
                            component={DatePut}
                        />
                        <br/>
                        <Field
                            label='city'
                            name='city'
                            component={TextInput}
                        />
                        <br/>
                        <Field
                            label='zipCode'
                            name='zipCode'
                            component={TextInput}
                        />
                        <br/>
                        <Field
                            label='cellPhone'
                            name='cellPhone'
                            component={TextInput}
                        />
                        <br/>
                        < Field
                            label='password'
                            name='password'
                            component={PasswordPut}
                        />
                        <br/>
                        <Field
                            label='confirmPassword'
                            name='confirmPassword'
                            component={ConfirmPasswordPut}
                        />


                        < Button
                            disabled={disabledButton}
                            type="submit"
                            className={classes.buttonValidate}
                        > <FormattedMessage id='button.submit'/> </Button>
                    </form>
                </Paper>
                < Button
                    className={classes.buttonNewAccount}
                > <Link to="/login"><FormattedMessage id='button.yetAccount'/></Link>
                </Button>
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
        form: 'signIn',
        validate
    }),
    connect(
        mapStateToProps,
        action
    ), withStyles(styles))(SignIn)

