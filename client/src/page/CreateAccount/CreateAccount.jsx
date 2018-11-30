import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Field, reduxForm} from 'redux-form'
import {compose} from 'redux'
import {connect} from 'react-redux'

import {Button, withStyles, Paper} from "@material-ui/core"

import PasswordPut from '../../component/input/PasswordPut'
import TextInput from '../../component/input/TextInput'
import SelectPut from '../../component/input/SelectPut'
import appConst from '../../utilities/appConst'
import DatePut from '../../component/input/DatePut'
import Title from '../../component/typography/Title'
import {buttonNewAccount, buttonValidateFormStyle, divWrapper, paperFormStyle} from "../../utilities/styleConst";
import Caption from "../../component/typography/Caption";
import {submitLogin} from "../LoginForm/services/loginFormActions";

const validate = (values) => {
    const errors = {}

    if (!appConst.regExPassword.test(values.password)) {
        errors.password= 'error.passwordElement'
    }

    if (values.password === '') {
        errors.password= 'error.passwordEmpty'
    }

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword= 'error.confirmPassword'
    }

    if (!appConst.regExEmail.test(values.email)) {
        errors.email= 'error.email'
    }

    console.log('Les erreurs sont = ', errors)
    return errors
}

const required = value => value ? undefined : 'Required'

const styles = theme => ({
    paperStyle: paperFormStyle,
    buttonValidate: buttonValidateFormStyle,
    buttonNewAccount: buttonNewAccount,
    divWrapper: divWrapper,
})

const handdleClickNewAccount = () => {
    console.log('test')
    window.location.href= 'http://localhost:3000/#/login'
}

class CreateAccount
    extends PureComponent {

    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    submit = (values) => {
        console.log('On Submit', values)
    }

    render() {
        const {error, classes} = this.props
        return (
            <div className={classes.divWrapper}>
            <Paper
                className={classes.paperStyle}
            >
                <Title idMessage='title.createAccount'/>
                <form
                    onSubmit={this.props.handleSubmit((values) => this.submit(values))}>
                    <Field
                        label='email'
                        name='email'
                        component={TextInput}
                        validate={[ required ]}
                    />
                    <br/>
                    < Field
                        label='password'
                        name='password'
                        component={PasswordPut}
                        control={true}
                    />
                    <br/>
                    <Field
                        label='confirmPassword'
                        name='confirmPassword'
                        component={PasswordPut}
                        className={classes.field}
                        required
                        error={error}
                        control={false}
                    />
                    <br/>
                    <Field
                        label='gender'
                        name='gender'
                        component={SelectPut}
                        className={classes.field}
                        required
                        error={error}
                        tabItem={appConst.genderTab}
                    />
                    <br/>
                    <Field
                        label='age'
                        name='age'
                        component={DatePut}
                        error={error}
                    />
                    <br/>
                    <Field
                        label='city'
                        name='city'
                        component={TextInput}
                        error={error}
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
                    < Button
                        type="submit"
                        className={classes.buttonValidate}
                    > <FormattedMessage id='button.submit'/> </Button>
                </form>
            </Paper>
                <Caption idMessage='caption.yetAccount'/>
                < Button
                    className={classes.buttonNewAccount}
                    onClick={() => handdleClickNewAccount()}
                > <FormattedMessage id='button.toConnect'/> </Button>
            </div>
        )
    }
}

const action = {
}

const mapStateToProps = (state) => ({
})

export default compose(
    reduxForm({
        form: 'createAccount',
        validate
    }),
    connect(
        mapStateToProps,
        action
    ), withStyles(styles))(CreateAccount)
