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
    state = {
        password: ''
    }

    handleClickShowPassword = () => {
        this.props.setShowPassword()
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    }

    render() {
        const {
            label,
            input,
            control,
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
                    name={label}
                    type={showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    error={meta.error && meta.touched }
                    className={classes.fieldS}
                    onChange={this.handleChange('password')}
                    endAdornment={control ?
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                        : ''}
                    {...input}
                />
                {meta && meta.error && meta.touched  &&
                <FormHelperText
                    className={classes.errorS}
                    id="component-error-text">
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
