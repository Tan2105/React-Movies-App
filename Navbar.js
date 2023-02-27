import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component{
    render(){
        return(
            <div style={{display: 'flex', padding: '0.5'}}>
                <Link to="/" style={{textDecoration: 'none'}}><h1 style={{marginLeft: '1rem', marginTop: '1rem'}}>Movies Hub</h1></Link>
                <Link to="/favourites" style={{textDecoration: 'none'}}><h3 style={{marginLeft: '2rem', marginTop: '1.7rem'}}>Favourites</h3></Link>
            </div>
        )
    }
}