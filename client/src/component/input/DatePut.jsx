import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import {FormControl, FormHelperText, TextField, withStyles} from '@material-ui/core'
import {errorStyle, fieldStyle} from "../../utilities/styleConst";

const style = {
    errorS: errorStyle,
    fieldS: fieldStyle
}

class DatePut
    extends PureComponent {

    render() {
        const {label, classes, input, meta} = this.props
        return (
            <FormControl
                className={classes.fieldS}>
                <TextField
                    id={label}
                    label={<FormattedMessage id={`form.${label}`}/>}
                    type="date"
                    error={meta.error && meta.touched}
                    className={classes.fieldS}

                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...input}
                />
                {meta && meta.error && meta.touched &&
                    <FormHelperText
                        className={classes.errorS}
                    >
                        <FormattedMessage id={meta.error}/>
                    </FormHelperText>}
            </FormControl>
        )
    }
}

DatePut.propTypes = {
    label: PropTypes.string.isRequired
}

export default withStyles(style)(DatePut)