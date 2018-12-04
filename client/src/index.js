import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store, {history} from './store'

import './index.css'
import {IntlProvider, addLocaleData} from 'react-intl'
import locale_en from 'react-intl/locale-data/en'
import locale_fr from 'react-intl/locale-data/fr'
import message_en from './translations/en.json'
import message_fr from './translations/fr.js'
import {ConnectedRouter} from "connected-react-router"

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {HashRouter, Route, Switch} from "react-router-dom";
import NotificationBar from './component/notificationBar/NotificationBar'
import Login from './component/Login/Login'
import SignIn from './component/SignIn/SignIn'
import Profile from './component/container/Profile/Profile'
import User from './component/container/User/User'
import Wall from './component/container/Wall/Wall'
import Messenger from './component/container/Messenger/Messenger'
import Admin from './component/container/Admin/Admin'
import Whoops404 from './component/container/Error/Whoops404'

addLocaleData([...locale_en, ...locale_fr])

export const theme = createMuiTheme();


const messages = {
    'fr': message_fr,
    'en': message_en
}

const language = navigator.language.split(/[-_]/)[0]
const target = document.querySelector('#root')

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <IntlProvider locale={language} messages={messages[language]}>
                <MuiThemeProvider theme={theme}>
                    <HashRouter>
                        <div>
                            <Switch>
                                <Route path='/login' component={Login} />
                                <Route path='/signIn' component={SignIn} />
                                <Route exact path='/' component={Profile} />
                                <Route path='/user/:handle' component={User}/>
                                <Route path='/profile' component={Profile}/>
                                <Route path='/wall' component={Wall} />
                                <Route path='/messenger' component={Messenger}/>
                                <Route path='/admin' component={Admin}/>
                                <Route component={Whoops404}/>
                            </Switch>
                            <div className="App" style={{width: '100%'}}>
                                <NotificationBar/>
                            </div>
                        </div>
                    </HashRouter>
                </MuiThemeProvider>
            </IntlProvider>
        </ConnectedRouter>
    </Provider>,
    target
)
