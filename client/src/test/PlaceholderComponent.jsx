import React from 'react'
import { Link } from 'react-router-dom'
import {PageTemplate} from './PageTemplate'

export const Home = () => {

    return (
        <PageTemplate>
            <div className="home">
                < h1>Choucroute corporation</ h1>
            </div>
        </PageTemplate>
    )
}


export const About = () =>
    <PageTemplate>
    < section className="about">
        < h1>[About] </ h1>
    </ section>
    </PageTemplate>

export const Events = () =>
    <PageTemplate>
    < section className="events">
        < h1>[ Events Calendar] </ h1>
    </ section>
    </PageTemplate>

export const Products = () =>
    <PageTemplate>
    < section className="products">
        < h1>[ Products Catalog] </ h1>
    </ section>
    </PageTemplate>

export const Contact = () =>
    <PageTemplate>
    < section className="contact">
        < h1>[ Contact Us] </ h1>
    </ section>
    </PageTemplate>

export const Whoops404 = ({ location }) =>
    <PageTemplate>
    < div className =" whoops-404" >
        < h1 > Resource not found at '{ location.pathname}' </ h1 >
    </ div >
    </PageTemplate>

export const GetParam = ({match}) =>{
    localStorage.setItem('test', 'Uno')
    if (localStorage.getItem('test')==='Uno') {
        console.log('jiraisur', match)
    } else {
        console.log('nop, jirai sur LOGIN')
    }
    console.log('Oh Yeah ', match)
    return <div></div>
}




