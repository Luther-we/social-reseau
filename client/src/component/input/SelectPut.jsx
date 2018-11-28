import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {FormattedMessage} from "react-intl";
import {FormControl, InputLabel, MenuItem, Select, FormHelperText, Input} from '@material-ui/core'

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
        const {label, tabItem, error, className} = this.props
        return (
            <FormControl>
                <InputLabel htmlFor={label}><FormattedMessage id={`${label}.title`}/></InputLabel>
                <Select
                    value={this.state.value}
                    className={className}
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
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        )
    }
}

SelectPut.propType = {
    label: PropTypes.string,
    tabItem: PropTypes.array
}

const mapStateToProps = state => ({})

const actions = {}

export default connect(mapStateToProps, actions)(SelectPut)