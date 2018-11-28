import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Avatar, Chip, DialogTitle, Dialog} from '@material-ui/core'

class MessageDialog extends PureComponent {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleDelete = () => {
        console.log('Test')
    }

    render() {
        const { classes, groupMessageTab, peopleMessageTab, selectedValue, ...other } = this.props;

        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="messageDialog"
                {...other}
            >
                <DialogTitle
                    id="simple-dialog-title"
                >
                    Set backup account
                </DialogTitle>
                <div>
                    {groupMessageTab.map(group => (
                        <Chip
                            onDelete={this.handleDelete}
                            avatar={<Avatar src={group.avatar}/>}
                            label={group.label}
                        />
                    ))}
                </div>
            </Dialog>
        );
    }
}

MessageDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

export default (MessageDialog)
