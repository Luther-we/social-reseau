import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogUI from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class Dialog extends PureComponent {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <DialogUI
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                {...other}
            >
                <DialogTitle
                    id="simple-dialog-title"
                >
                    Set backup account
                </DialogTitle>
                <div>
                    <List>
                        {emails.map(email => (
                            <ListItem button onClick={() => this.handleListItemClick(email)} key={email}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="add account" />
                        </ListItem>
                    </List>
                </div>
            </DialogUI>
        );
    }
}

Dialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

export default withStyles(styles)(Dialog)
