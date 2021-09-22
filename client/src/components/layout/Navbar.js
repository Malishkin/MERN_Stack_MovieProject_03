import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
      <div>
        <nav className='navbar bg-dark'>
          <h1>
            <Link to='/'>
              <i className='fas fa-film'></i> Movie Connector
            </Link>
          </h1>
          <ul>
            <li>
              <Link to='/movies'>Movies</Link>
            </li>
            <li>
              <Link to='/addmovie'>Add Movie</Link>
            </li>
            <li>
              <Link to='/members'>Members</Link>
            </li>
            <li>
              <Link to='/addmember'>Add Member</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/'>Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
}
