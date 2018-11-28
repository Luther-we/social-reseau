import React, {PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import {Field, reduxForm} from 'redux-form'
import {compose} from 'redux'
import {connect} from 'react-redux'

import {Button, withStyles, Paper, Snackbar, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {submitLogin} from './services/loginFormActions'
import PasswordPut from '../../component/input/PasswordPut'
import TextInput from '../../component/input/TextInput'
import Title from '../../component/typography/Title'
import appConst from '../../utilities/appConst'

import axios from './../../utilities/axios'

const validate = (values) => {
    const errors = {}

    if (!appConst.regExEmail.test(values.email)) {
        errors.email= 'error.email'
    }

    console.log('Les erreurs sont = ', errors)
    return errors
}

const styles = theme => ({
    paperStyle: {
        width: 300,
        margin: 'auto',
        marginTop: theme.spacing.unit
    },
    appBar: {
        height: 40,
        top: 0,
        width: '100%'
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
})

class LoginForm
    extends PureComponent {
    constructor(props) {
        super(props)
        this.state={}
        this.submit = this.submit.bind(this)
    }

    submit = (values) => {
        axios.post('http://localhost:6000/submit/account', values)
            .then( resp => {
                if (resp.success) {

                } else {
                    console.log("I'm like a bird")

                    window.location.pathname.replace('/')
                        // return (
                        //     <div>
                        //         <span>BElo</span>
                        //         <p>Hello</p>
                        //     <Snackbar
                        //         anchorOrigin={{
                        //             vertical: 'bottom',
                        //             horizontal: 'left',
                        //         }}
                        //         open
                        //         autoHideDuration={6000}
                        //         onClose={this.handleClose}
                        //         ContentProps={{
                        //             'aria-describedby': 'message-id',
                        //         }}
                        //         message={<span id="message-id">Note archived</span>}
                        //         action={[
                        //             <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                        //                 UNDO
                        //             </Button>,
                        //             <IconButton
                        //                 key="close"
                        //                 aria-label="Close"
                        //                 color="inherit"
                        //                 className={this.props.classes.close}
                        //                 onClick={this.handleClose}
                        //             >
                        //                 <CloseIcon />
                        //             </IconButton>,
                        //         ]}
                        //     />
                        //     </div>
                        // )

                }
                console.log('YEAH !!!! = ', resp.data)
                window.location.replace('/')
            })

        // console.log('On Submit', values)
        // this.props.submitLogin(values)
    }

    render() {
        const {classes, children} = this.props

        return (
            <Paper
                className={classes.paperStyle}
            >
                <Title idMessage ='title.connectTo'/>
                <form
                    className={classes.form}
                    onSubmit={this.props.handleSubmit((values) => this.submit(values))}>
                    <Field
                        label='email'
                        name='email'
                        component={TextInput}
                    />
                    <br/>
                    < Field
                        label='password'
                        name='password'
                        component={PasswordPut}
                        control={true}
                    />
                    <br/>
                    < Button
                        type="submit"
                    > <FormattedMessage id='form.toConnect'/> </Button>
                </form>
                {children}
            </Paper>
        )
    }
}



const action = {
    submitLogin
}

export default compose(
    reduxForm({
        form: 'connect',
        validate
    }),
    connect(
        null,
        action
    ), withStyles(styles))(LoginForm)
