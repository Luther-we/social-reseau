import socketIOClient from 'socket.io-client'
import devConst from './devConst'
import appConst from './appConst'

export const socket = devConst.dev ? socketIOClient(`${appConst.adresse}:${appConst.port}`) : socketIOClient(`${appConst.adresse}`)

export const connectSocket = () => {
    socket.emit('test', {1: 'yop'})
}

export const submitUser = (value) => {
    console.log('submitUser is called', value)
    socket.emit('submitUser', value)
}

socket.on('userOk', (value) => {
    console.log('Return of the mack')

})
// socket.emit('test', {1: 'yop'})

socket.on('reponse', (data) => {
    console.log('fucking Yeah', data)
})