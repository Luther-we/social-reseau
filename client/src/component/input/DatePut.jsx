import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import {TextField} from '@material-ui/core'

class DatePut extends PureComponent {

    render() {
        const {label, className, defaultDate, input} = this.props
        return (
                <TextField
                    id={label}
                    label={<FormattedMessage id={`form.${label}`} />}
                    type="date"
                    defaultValue={defaultDate}
                    className={className}

                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...input}
                />
        )
    }
}

DatePut.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    defaultDate: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
})

const actions = {

}

export default connect(mapStateToProps, actions)(DatePut)