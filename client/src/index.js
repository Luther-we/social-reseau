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

const connectionsOptions = {
    'force new connection': true,
    'reconnectionAttemps': 'Infinity',
    'timeout': 10000,
    'tranports': ['websocket']
}


const socket = socketIOClient('localhost:4001');
console.log('Emit socket')

socket.emit('test', {1: 'yop'})

socket.on('reponse', (data) => {
    console.log('fucking Yeah', data)
})

addLocaleData([...locale_en, ...locale_fr])

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
                <App/>
            </IntlProvider>
        </ConnectedRouter>
    </Provider>,
    target
)
