import React from 'react'
import {MainMenu} from './MainMenu'
import devConst from "../utilities/devConst";

export const PageTemplate = ({match, children}) => {
            return (
                <div className='page'>
                    <MainMenu/>
                    {children}
                </div>
            )





    }

