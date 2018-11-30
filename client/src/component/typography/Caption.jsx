import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Typography, withStyles} from '@material-ui/core'

const styles = theme =>({
    caption: {
        paddingTop: theme.spacing.unit
    }
})

class Caption extends PureComponent {
    render() {
        const {idMessage, classes} = this.props
        return (
            <Typography
                variant="caption"
                gutterBottom
                className={classes.caption}
            >
                <FormattedMessage id={idMessage} />
            </Typography>
        )
    }
}

export default withStyles(styles)(Caption)