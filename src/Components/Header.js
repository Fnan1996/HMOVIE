import React from 'react'
import SearchBox from './SearchBox'
import { NavLink } from 'react-router-dom'

const Header = (prop) => {
  return (
    <header className='header'>
        <div>
            <img src="" alt="" />
            <span><h1>HMOVIES</h1></span>
        </div>
        <nav className="navbar">
            <ul><NavLink to="/" end>Home</NavLink></ul>
            <ul><NavLink to='/favorate' >Favorite</NavLink></ul>
            <ul><SearchBox searchFilm={prop.searchFilm} setSearchFilm={prop.setSearchFilm} /></ul>
        </nav>
    </header>
  )
}

export default Header
