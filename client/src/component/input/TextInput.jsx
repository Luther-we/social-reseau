import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {FormControl, InputLabel, Input, FormHelperText, withStyles} from '@material-ui/core'
import {FormattedMessage} from 'react-intl'
import {errorStyle, fieldStyle} from '../../utilities/styleConst'

const style = {
    errorS: errorStyle,
    fieldS: fieldStyle
}

class TextInput
    extends PureComponent {

    render() {
        const {label, input, meta, type, required, autoComplete, classes} = this.props

        return (
            <FormControl
            className={classes.fieldS}>
                <InputLabel htmlFor="adornment-password"><FormattedMessage id={`form.${label}`} /> {required ? '*': ''}</InputLabel>
                <Input
                    id={label}
                    autoComplete={autoComplete || 'off'}
                    error={meta.error && meta.touched}
                    className={classes.fieldS}
                    type={type ? type : 'text'}
                    {...input}
                />
                {meta && meta.error && meta.touched &&
                <FormHelperText
                    className={classes.errorS}
                    id={meta.error}>
                    <FormattedMessage id={meta.error}/>
                </FormHelperText>}
            </FormControl>
        )
    }
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired
}

export default withStyles(style)(TextInput)
