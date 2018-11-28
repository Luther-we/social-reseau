import React from 'react'

import { NavLink } from 'react-router-dom'

const selectedStyle = {
    color: 'slategray'
}

export const MainMenu = () =>
    <nav>
        <NavLink to='/'>
            Home
        </NavLink>
        <NavLink to='/about' activeStyle={selectedStyle}>
            About
        </NavLink>
        <NavLink to='/events' activeStyle={selectedStyle}>
            Events
        </NavLink>
        <NavLink to='/products' activeStyle={selectedStyle}>
            Products
        </NavLink>
        <NavLink to='/contact' activeStyle={selectedStyle}>
            Contact
        </NavLink>
    </nav>

export const AboutMenu = ({match}) =>
    <div>
        <li>
            <NavLink to='/about' style={match.isExact && selectedStyle} >
                Company
            </NavLink>
        </li>
        <li>
            <NavLink to='/about/history' activeStyle={selectedStyle}>
                history
            </NavLink>
        </li>
    </div>
