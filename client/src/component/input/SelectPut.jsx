import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {FormattedMessage} from "react-intl";
import {FormControl, InputLabel, MenuItem, Select, FormHelperText, Input, withStyles} from '@material-ui/core'
import {errorStyle, fieldStyle} from "../../utilities/styleConst";

const style = {
    errorS: errorStyle,
    fieldS: fieldStyle
}

class SelectPut
    extends PureComponent {
    state = {
        value: ''
    }

    handleChange = (e) => {
        this.setState({
            value: e
        })
    }

    render() {
        const {label, tabItem, meta, classes} = this.props
        return (
            <FormControl
                className={classes.fieldS}>
                <InputLabel htmlFor={label}><FormattedMessage id={`${label}.title`}/></InputLabel>
                <Select
                    value={this.state.value}
                    className={classes.fieldS}
                    onChange={this.handleChange}
                    input={<Input name={label} id={label}/>}
                >
                    {tabItem.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}><FormattedMessage
                                id={`${label}.${item}`}/></MenuItem>
                        )
                    })}
                </Select>
                <FormHelperText>{meta.error}</FormHelperText>
            </FormControl>
        )
    }
}

SelectPut.propType = {
    label: PropTypes.string,
    tabItem: PropTypes.array
}

export default withStyles(style)(SelectPut)