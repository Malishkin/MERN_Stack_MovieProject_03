import React from 'react'
import { Link } from 'react-router-dom';

export const Landing = () => {
    return (
        <div>
             <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Movie Connector</h1>
          <p className="lead">
            Choose any movie you wish from our big data of movies, subscribe and enjoy
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
        </div>
    )
}
