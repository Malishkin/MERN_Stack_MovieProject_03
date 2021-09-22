
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import MoviesComp from './Movies';



export const MainPage = (props) =>
{
    const history = useHistory();
    const [movies, setMovies] = useState([]);
    const [text, setText] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    console.log("received movieID: " + props.match.params.movieId);
  
    const fullname = sessionStorage.getItem('name');
    const token = sessionStorage.getItem('token');
    

    useEffect( () =>
    {
      if(!token || !fullname)
      {
        history.push("/login")
      }


      async function fetchData() {
  
        let resp = await axios.get('/api/movies');
        
      
      let moviesByUrlParam = [];
      if (props.match.params.movieId === undefined || props.match.params.movieId === null) {
        moviesByUrlParam = resp.data;
      }
      else {
        moviesByUrlParam = resp.data.filter(movie => movie._id === props.match.params.movieId);
      }
      
      setMovies(moviesByUrlParam);
      setFilteredMovies(moviesByUrlParam);

     
      } fetchData();
        
        
        
      
    }, [])

    const findByText = () =>
    {
        
      let movSearch = movies.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredMovies(movSearch);
        
    }

    const reset = () =>
  {
    window.location.reload();
  }
    
   
    return (
        <div  >
            <h1 className='large text-primary'>All Movies</h1>
            <h2>Hello, {fullname}!</h2>
            <input className="form .social-input i" placeholder="Find movie" onChange={e=>setText(e.target.value)} />
            <input type="button" className='btn-success' value="Find..." onClick={findByText} />
            <input type="button" className='btn-dark' value="Reset" onClick={reset} />
        
            
        {
          { findByText } ?
          filteredMovies.map(item =>
              {
                  return <MoviesComp key={item._id} moviesData={item }/>
              }) :
              
               movies.map(item =>
                {
                    return <MoviesComp key={item._id} moviesData={item }/>
               })
         
        
        }
     
            
        </div>
    )
}
