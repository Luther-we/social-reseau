import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Field, reduxForm} from 'redux-form'
import {compose} from 'redux'

import {Button, withStyles, Paper} from "@material-ui/core"
import TextInput from '../../component/input/TextInput'
import SelectPut from "../../component/input/SelectPut";
import appConst from "../../utilities/appConst";
import DatePut from "../../component/input/DatePut";

const validate = (values) => {
    const errors = {}
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

class FullForm
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
                <form
                    className={classes.form}
                    onSubmit={this.props.handleSubmit((values) => this.submit(values))}>
                    <Field
                        label='lastname'
                        name='lastname'
                        component={TextInput}
                        className={classes.field}
                        required
                        error={error}
                    />
                    <br/>
                    <Field
                        label='firstname'
                        name='firstname'
                        component={TextInput}
                        className={classes.field}
                        required
                        error={error}
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
                    <br/>
                    <Field
                        label='language'
                        name='language'
                        component={SelectPut}
                        className={classes.field}
                        required
                        error={error}
                        tabItem={appConst.languagePref}
                        defaultValue={navigator.language.split(/[-_]/)[0]}
                    />
                    <br/>
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
        form: 'fullForm',
        validate
    }), withStyles(styles))(FullForm)


