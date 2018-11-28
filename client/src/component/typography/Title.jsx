import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Typography, withStyles} from '@material-ui/core'

const styles = theme =>({
    title: {
        paddingTop: theme.spacing.unit * 3
    }
})

class Title extends PureComponent {
    render() {
        const {idMessage, classes} = this.props
        return (
            <Typography
                component="h2"
                variant="display1"
                gutterBottom
                className={classes.title}
            >
                <FormattedMessage id={idMessage} />
            </Typography>
        )
    }
}

export default withStyles(styles)(Title)