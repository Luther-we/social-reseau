// import appConst from '../utilities/appConst'



export const connectUser = (value) => {
    console.log('ça va sousmettre ', value)
}

// export const connectSocket = () => {
//     const adresse = window.location.hostname
//     const port = process.env.PORT || 5000
//
// // si erreur de socket sur Heroku....
//     const socket = devConst.dev ? socketIOClient(`${adresse}:${port}`) : socketIOClient(`${adresse}`)
// }
//
// export const connectUser = (value) => {
//     socket.emit
// }

// const server= appConst.server
//
// const ping = async () => {
//     const response = await fetch(`${server}/api/hello`)
//     const body = await response.json()
//     if (response.status !== 200) throw Error(body.message)
//     return body
// }
//
// const getUser = async () => {
//     const response = await fetch(`${server}/auth/user`)
//     const body = await response.json()
//     if (response.status !== 200) throw Error(body.message)
//     return body
// }
//
//
// export default {
//     ping,
//     getUser
// }