import LoginPage from 'page/LoginPage/LoginPage'
import errorRoutes from 'page/error/errorRoutes'

const redirect404 = (nextState, replace) => {
    replace('/error/404')
}

export default (redirectLogin, redirectToHome) => ({
    childRoutes:[
        {
            path:'/login',
            component: LoginPage,
            onEnter: redirectToHome
        },
        {
            path: '/',
            onEnter: redirectLogin,
            component: Layout,
            indexRoute: { onEnter: (nextState, replace) =>
                    replace (`${lastRoute ? `${lastRoute}` : `/featured`}`)
            },
            childRoutes: [
                ...errorRoutes
            ]
        },
        {
            path: '*',
            onEnter: redirect404
        }
    ]
})