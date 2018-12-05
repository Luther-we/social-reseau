import React, {PureComponent} from 'react'
import App from '../../App/App'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {FormattedMessage} from "react-intl"
import withAuth from "../../auth/withAuth"
import AuthHelperMethods from '../../auth/AuthHelperMethods'
import {setUserFriends} from '../../App/services/appAction'
import {openNotificationBarError, openNotificationBarValid} from '../../notificationBar/services/notificationBarActions'

import {
    Paper,
    withStyles,
    CardMedia,
    CardContent,
    CardActionArea,
    Card,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField
} from '@material-ui/core'
import {InfoElement} from "../../typography/InfoElement";
import Title from "../../typography/Title";
import axios from "axios";
import appConst from '../../../utilities/appConst'

const style = theme => ({
    divWrapper: {
        width: '100%',
        margin: 'auto',
        textAlign: 'center',
        paddingBottom: 50
    },
    column: {
        margin: 'auto',
        marginTop: theme.spacing.unit,
        width: 400,
        padding: 10
    },
    media: {
        width: 200,
        height: 260,
        margin: 'auto',
    },
    cardFriend: {
        width: 100,
        display: 'inline-block',
        marginLeft: theme.spacing.unit
    },
    cardMediaFriend: {
        width: 100,
        height: 100
    },
    mediaBackground: {
        width: 400,
        height: 300,
        margin: 'auto',
        opacity: 0.9,
        paddingTop: 40
    },
    texte: {
        width: 150,
        display: 'inline'
    },
    cardLittle: {
        width: 180,
        display: 'inline-block',
    },
    dialogDelete: {
        padding: 65
    }
})

class Profile
    extends PureComponent {
    state = {
        openDelete: false,
        helperTextDelete: '',
    }

    Auth = new AuthHelperMethods()

    componentWillMount() {
        setTimeout(() => {
            const tabFriends = this.props.user.friends
            axios.post("/getFriends", {
                tabFriends: tabFriends
            })
                .then(data => {
                    this.props.setUserFriends(data.data)
                })
                .catch(e => console.log('retour erreur', e))
        }, 1000)
    }

    actionOnClick = (event) => {
        const id= event.target.title
        this.props.history.replace(`/user/${id}`)
    }

    _handleLogout = () => {
        this.Auth.logout()
        this.props.history.replace('/login');
    }

    _handleWall = () => {
        this.props.history.replace('/wall');
    }

    _handleDelete = (e) => {
        this.setState({
            ...this.state,
            openDelete: true
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            openDelete: false
        })
    }

    _submitDelete = (e) => {
        if (this.state.valueEmailDelete === this.props.user.email) {
            this.setState({
                ...this.state,
                openDelete: false
            })
            axios.post("/deleteUser", {
                userId: this.props.user.userId,
                email: this.state.valueEmailDelete
            })
                .then((data) => {
                    if (data.data.success) {
                        this.props.openNotificationBarValid(data.data.idMessage)
                        this.Auth.logout()
                        this.props.history.replace("/login")
                    } else {
                        this.props.openNotificationBarError(data.data.idMessage)
                    }
                })
                .catch(e => console.log('retour erreur', e))
        } else {
            this.props.openNotificationBarError('error.emailNotSame')
        }
    }

    _handleChange = (e) => {
        this.setState({
            ...this.state,
            valueEmailDelete: e.target.value
        })
    }


    render() {
        const {classes, user} = this.props

        const tabAlreadyFriend = []
        user.friends && user.friends.map((friend) => {
            if (friend.relation === 2) {
                tabAlreadyFriend.push(friend)
            }
            return null
        })

        return (
            <div className={classes.divWrapper}>
                <App/>
                <Paper
                    className={classes.column}
                    elevation={3}
                    square
                >
                    <CardMedia
                        className={classes.mediaBackground}
                        image={user.profilCover ? user.profilCover : appConst.defaultProfileCover}
                        title='Cover'
                    >
                        <CardMedia
                            className={classes.media}
                            image={user.profilPicture ? user.profilPicture : appConst.defaultProfilePicture}
                            title="Picture"
                        />
                    </CardMedia>
                </Paper>
                <Paper className={classes.column}>
                    <Button
                        onClick={() => this._handleWall()}
                    >THE WALL</Button>
                </Paper>
                <Paper className={classes.column}>
                    <Button
                        onClick={() => this._handleLogout()}
                    >LOGOUT</Button>
                </Paper>
                <Dialog
                    // selectedValue={this.state.selectedValue}
                    open={this.state.openDelete}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Supprimer votre compte</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Il semble que vous souhaitiez supprimer votre compte. Attention, cette opération est définitive !
                            Veuillez saisir votre adresse email pour confirmer la suppression.
                        </DialogContentText>
                        <TextField
                            id="emailToDelete"
                            label="Email du compte"
                            className={classes.textField}
                            helperText={this.state.helperTextDelete}
                            onChange={(e) => this._handleChange(e)}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this._submitDelete} color="primary" autoFocus>
                            Valider
                        </Button>
                    </DialogActions>
                </Dialog>
                <Paper className={classes.column}>
                    <Button
                        onClick={() => this._handleDelete()}
                    >DELETE</Button>
                </Paper>
                <Paper
                    className={classes.column}
                    elevation={3}
                    square
                >
                    <Typography component="h2" variant="headline" gutterBottom>
                        {user.pseudo}
                    </Typography>
                    <Typography variant="title" gutterBottom>
                        {user.firstname} {user.lastname}
                    </Typography>
                    {user.city && <InfoElement
                        caption={<FormattedMessage id='form.city'/>}
                        body={user.city}
                        className={classes.texte}
                    />}
                    {user.zipCode && <InfoElement
                        caption={<FormattedMessage id='form.zipCode'/>}
                        body={user.zipCode}
                        className={classes.texte}
                    />}
                    {user.birthday && <InfoElement
                        caption={<FormattedMessage id='form.birthday'/>}
                        body={user.birthday}
                        className={classes.texte}
                    />}

                    {user.gender && <InfoElement
                        caption={<FormattedMessage id='gender.title'/>}
                        body={user.gender}
                        className={classes.texte}
                    />}
                </Paper>
                {user.friends && user.friends.length > 0 &&
                <Paper
                    className={classes.column}
                    elevation={3}
                    square
                >
                    <Title idMessage='title.friends'/>
                    {tabAlreadyFriend.map((friend, i) => {
                        if (i < appConst.limitDisplayProfileFriends) {
                            return (
                                <Card
                                    key={i}
                                    className={classes.cardFriend}
                                    onClick={(event)=>this.actionOnClick(event)}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.cardMediaFriend}
                                            image={friend.profilePicture ? friend.profilePicture : appConst.defaultProfilePicture}
                                            title={friend.userId}
                                        />
                                        <CardContent>
                                            {friend.pseudo}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        }
                        return null
                    }
                )}

                </Paper>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const action = {
    setUserFriends,
    openNotificationBarError,
    openNotificationBarValid
}

export default withAuth(compose(
    connect(mapStateToProps, action),
    withStyles(style)
)(Profile))
