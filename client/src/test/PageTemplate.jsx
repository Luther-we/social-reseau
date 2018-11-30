import React from 'react'
import {MainMenu} from './MainMenu'
import devConst from "../utilities/devConst";
import LoginForm from "../page/LoginForm/LoginForm";

export const PageTemplate = ({match, children}) => {
    console.log('Template appli ok', window.location)
    console.log('Matcha', match)
    if (devConst.token) {
        if (devConst.user) {
            console.log('Connecté donc go')
            return (
                <div className='page'>
                    <MainMenu/>
                    {children}
                </div>
            )
        } else {
            console.log('Récupération du uder nécessaire')
            return <div></div>
        }
    } else {
        console.log('Retour login car non connecté')
        window.location.href.replace('http://localhost:3000/#/events')
        return <LoginForm/>

    }
}
