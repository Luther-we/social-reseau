// import appConst from '../utilities/appConst'
//
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