import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Field, reduxForm} from 'redux-form'
import {compose} from 'redux'

import {Button, withStyles, Paper} from "@material-ui/core"

import PasswordPut from '../../component/input/PasswordPut'
import TextInput from '../../component/input/TextInput'
import SelectPut from '../../component/input/SelectPut'
import appConst from '../../utilities/appConst'
import DatePut from '../../component/input/DatePut'
import Title from '../../component/typography/Title'

const validate = (values) => {
    const errors = {}

    if (!appConst.regExPassword.test(values.password)) {
        errors.password= 'error.passwordElement'
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

const styles = {
    field: {
        width: 250
    },
    paperStyle: {
        width: 300,
        margin: 'auto'
    }
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
            <Paper
                className={classes.paperStyle}
            >
                <Title idMessage='title.createAccount'/>
                <form
                    className={classes.form}
                    onSubmit={this.props.handleSubmit((values) => this.submit(values))}>
                    <Field
                        label='email'
                        name='email'
                        component={TextInput}
                        className={classes.field}
                        required
                    />
                    <br/>
                    < Field
                        label='password'
                        name='password'
                        component={PasswordPut}
                        className={classes.field}
                        required
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
                        className={classes.field}
                        required
                        defaultDate='1970-01-01'
                        error={error}
                    />
                    <br/>
                    <Field
                        label='city'
                        name='city'
                        component={TextInput}
                        className={classes.field}
                        error={error}
                    />
                    <br/>
                    <Field
                        label='zipCode'
                        name='zipCode'
                        component={TextInput}
                        className={classes.field}
                        error={error}
                    />
                    <br/>
                    <Field
                        label='cellPhone'
                        name='cellPhone'
                        component={TextInput}
                        className={classes.field}
                        error={error}
                    />
                    < Button
                        type="submit"
                    > <FormattedMessage id='form.submit'/> </Button>
                </form>
            </Paper>
        )
    }
}

export default compose(
    reduxForm({
        form: 'createAccount',
        validate
    }), withStyles(styles))(CreateAccount)
