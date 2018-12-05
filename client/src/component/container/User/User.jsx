import React, {PureComponent} from 'react'
import App from "../../App/App";
import withAuth from "../../auth/withAuth";
import axios from "axios";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Paper,
    Typography,
    withStyles,
    Button
} from "@material-ui/core";
import appConst from "../../../utilities/appConst";
import {InfoElement} from "../../typography/InfoElement";
import {FormattedMessage} from "react-intl";
import Title from "../../typography/Title";
import devConst from "../../../utilities/devConst";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";

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
    }
})

class User
    extends PureComponent {
    state = {
        user: {}
    }


    componentWillMount() {
        const id = this.props.history.location.pathname.split('/user/')[1]
        axios.get(`/getUser/${id}`)
            .then(data => {
                this.setState({
                    user: {
                        ...data.data,
                    friends: devConst.simFriends
                    }
                })
                const tabFriends = this.state.user.friends
                axios.post("/getFriends", {
                    tabFriends: tabFriends
                })
                    .then(data => {
                        this.setState({
                            user: {
                                ...this.state.user,
                                friends: data.data,
                                tabAlreadyFriend: []
                            }
                        })
                        let tabInter = []
                        this.state.user.friends && this.state.user.friends.map((friend) => {
                            if (friend.relation === 2) {
                                tabInter.push(friend)
                                return null
                            }
                            return null
                        })
                        this.setState({
                            user: {
                                ...this.state.user,
                                tabAlreadyFriend: [...tabInter]
                            }
                        })

                        this.findObjectByKey(this.props.actualUser.friends, 'userId', this.state.user.userId)
                        this.forceUpdate();
                    })
                    .catch(e => console.log('retour erreur', e))
            })
            .catch(e => console.log('retour erreur', e))
    }

    _handleAskForFriend = () => {

    }

    actionOnClick = (event) => {
        const id= event.target.title
        this.props.history.replace(`/user/${id}`)
    }

    handleClick = (ref) => {
        switch (ref)  {
            case 'goAccount':
                this.props.history.replace("/profile")
                break
            default:
                return null
        }
    }

    actionOnClick = (event) => {
        const id= event.target.title
        this.props.history.replace(`/user/${id}`)
    }

    findObjectByKey= (array, key, value) => {
        let check = true
        array.map((elem)=>{
            if (elem[key] === value && check) {
                check = false
                this.setState({
                    user: {
                        ...this.state.user,
                        autorise: elem.relation
                    }
                })
            }
            return null
        })
    }

    render() {
        const {classes} = this.props
        const {user} = this.state
        const tabAlreadyFriend = this.state.user.tabAlreadyFriend

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
                {user.autorise && user.autorise === 2 &&
                <div>
                    <Paper
                        className={classes.column}
                        elevation={3}
                        square
                    >
                        <Button
                            onClick={() => this._handleAskForFriend()}
                        >
                            <FormattedMessage id='user.askToFriend'/>
                        </Button>
                    </Paper>
                </div>
                }
                {user.autorise && user.autorise === 2 &&
                <div>
                    <Paper
                        className={classes.column}
                        elevation={3}
                        square
                    >
                        {user.pseudo}<FormattedMessage id='user.waitingIValidAFriend'/>

                        <br/>
                        <Button
                            onClick={() => this.handleClick('goAccount')}
                        >
                            <FormattedMessage id='button.toAccount'/>
                        </Button>
                    </Paper>
                </div>
                }
                {user.autorise && user.autorise === 2 &&
                <div>
                    <Paper
                        className={classes.column}
                        elevation={3}
                        square
                    >
                        <FormattedMessage id='user.waitingValidation1'/>{user.pseudo}<FormattedMessage id='user.waitingValidation2'/>
                        <br/>
                        <Button
                            onClick={() => this.handleClick('goAccount')}
                        >
                            <FormattedMessage id='button.toAccount'/>
                        </Button>
                    </Paper>
                </div>
                }
                {user.autorise && user.autorise === 2 &&
                    <div>
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
                {tabAlreadyFriend && tabAlreadyFriend.length > 0 &&
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
                                        onClick={(event) => this.actionOnClick(event)}
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
                }
            </div>
        )
    }
}

const action = {}

const mapStateToProps = state => ({
  actualUser: state.user
})
export default withAuth(compose(
    connect(mapStateToProps, action),
    withStyles(style)
)(User))