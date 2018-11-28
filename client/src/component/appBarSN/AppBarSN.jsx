import React, {PureComponent} from 'react'
import {AppBar, withStyles, Toolbar, Typography} from '@material-ui/core'

const style = {
    appBar: {
        height: 40,
        top: 'auto',
        bottom: 0,
        width: '100%'
    }
}

class AppBarSN extends PureComponent {
    render() {
        const {classes} = this.props
        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(style)(AppBarSN)
