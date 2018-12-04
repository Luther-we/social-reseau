import React, {PureComponent} from 'react'
import App from "../../App/App";
import withAuth from "../../auth/withAuth";
import Title from "../../typography/Title";
import appConst from "../../../utilities/appConst";
import {Card, CardActionArea, CardContent, CardMedia, Paper, withStyles} from "@material-ui/core";
import {setUserFriends} from "../../App/services/appAction";
import {
    openNotificationBarError,
    openNotificationBarValid
} from "../../notificationBar/services/notificationBarActions";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import AuthHelperMethods from "../../auth/AuthHelperMethods";
import axios from "axios";
import {saveAllUser} from "./services/wallActions";

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

class Wall
    extends PureComponent {

    Auth = new AuthHelperMethods()

    componentWillMount () {
        axios.get('/getAllUser')
            .then(data => {
                this.props.saveAllUser(data.data.data)
            })
            .catch(e => console.log(e))
    }

    render() {
        const {classes, allUser} = this.props
        return (

                <div>
                    <Paper
                        className={classes.column}
                        elevation={3}
                        square
                    >

                        <Title idMessage='title.friends'/>
                        {allUser.map((friend, i) => {
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
                            }
                        )}


                    </Paper>
                </div>

        )
    }
}

const mapStateToProps = state => ({
    allUser: state.wall.allUser
})

const action = {
    saveAllUser
}

export default withAuth(compose(
    connect(mapStateToProps, action),
    withStyles(style)
)(Wall))

