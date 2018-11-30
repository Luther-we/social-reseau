import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store, {history} from './store'

import './index.css'

import App from './App'

import {IntlProvider, addLocaleData} from 'react-intl'
import locale_en from 'react-intl/locale-data/en'
import locale_fr from 'react-intl/locale-data/fr'
import message_en from './translations/en.json'
import message_fr from './translations/fr.js'
import {ConnectedRouter} from "connected-react-router"
import socketIOClient from 'socket.io-client'
import devConst from './utilities/devConst'

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


const adresse = window.location.hostname
const port = process.env.PORT || 5000

// si erreur de socket sur Heroku....
const socket = devConst.dev ? socketIOClient(`${adresse}:${port}`) : socketIOClient(`${adresse}`)

console.log('Emit socket')
console.log(window.location.hostname)

socket.emit('test', {1: 'yop'})

socket.on('reponse', (data) => {
    console.log('fucking Yeah', data)
})

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
                    <App/>
                </MuiThemeProvider>
            </IntlProvider>
        </ConnectedRouter>
    </Provider>,
    target
)
