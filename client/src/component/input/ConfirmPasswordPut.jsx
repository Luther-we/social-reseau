import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    withStyles
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {setShowPassword} from "./services/inputActions";
import {FormattedMessage} from 'react-intl'
import {errorStyle, fieldStyle} from '../../utilities/styleConst'

const style = {
    errorS: errorStyle,
    fieldS: fieldStyle
}

class ConfirmPasswordPut
    extends PureComponent {
    render() {
        const {
            label,
            input,
            classes,
            required,
            showPassword,
            autoComplete,
            meta
        } = this.props
        console.log('test', input)
        return (
            <FormControl
                className={classes.fieldS}>
                <InputLabel htmlFor="adornment-password"><FormattedMessage id={`form.${label}`}/> {required ? '*' : ''}
                </InputLabel>
                <Input
                    id={label}
                    autoComplete={autoComplete}
                    type={showPassword ? 'text' : 'password'}
                    error={meta.error && meta.touched }
                    className={classes.fieldS}
                    {...input}
                />
                {meta && meta.error && meta.touched  && meta.dirty &&
                <FormHelperText
                    className={classes.errorS}
                >
                    <FormattedMessage id={meta.error}/>
                </FormHelperText>}
            </FormControl>
        )
    }
}

ConfirmPasswordPut.propType = {
    setShowPassword: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    showPassword: state.inputs.showPassword
})

const actions = {
    setShowPassword
}

export default compose(
    connect(mapStateToProps, actions),
    withStyles(style)
)(ConfirmPasswordPut)
