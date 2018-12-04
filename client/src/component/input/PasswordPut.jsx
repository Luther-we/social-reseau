import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FormHelperText,
    withStyles
} from '@material-ui/core'
import {VisibilityOff, Visibility} from '@material-ui/icons'
import PropTypes from 'prop-types'
import {setShowPassword} from "./services/inputActions";
import {FormattedMessage} from 'react-intl'
import {errorStyle, fieldStyle} from '../../utilities/styleConst'

const style = {
    errorS: errorStyle,
    fieldS: fieldStyle
}

class PasswordPut
    extends PureComponent {

    handleClickShowPassword = () => {
        this.props.setShowPassword()
    }

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
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                        }

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

PasswordPut.propType = {
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
)(PasswordPut)
