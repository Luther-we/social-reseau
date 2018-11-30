import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import {TextField, withStyles} from '@material-ui/core'
import {errorStyle, fieldStyle} from "../../utilities/styleConst";

const style = {
    errorS: errorStyle,
    fieldS: fieldStyle
}

class DatePut extends PureComponent {

    render() {
        const {label, classes, input} = this.props
        return (
                <TextField
                    id={label}
                    label={<FormattedMessage id={`form.${label}`} />}
                    type="date"
                    className={classes.fieldS}

                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...input}
                />
        )
    }
}

DatePut.propTypes = {
    label: PropTypes.string.isRequired
}

export default withStyles(style)(DatePut)