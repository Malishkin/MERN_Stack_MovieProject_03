
import React, { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
function AddMovieComp(props) {

  const fullname = sessionStorage.getItem('name');
  const token = sessionStorage.getItem('token');
  const history = useHistory();
  const [movie, setMovie] = useState([]);

    useEffect(async () =>
    {
      if(!token || !fullname)
      {
        history.push("/login")
      }
  
       
      
    }, [])
  
  const customSubmit = async(e) =>
  {
    e.preventDefault();
    let obj = {
      name: movie.name,
      genres: movie.genres,
      premiered: movie.premiered,
      image: movie.image
    }
    await axios.post('/api/movies', obj);
    
    history.push('/movies');
  }

  const cancelMovie = () =>
  {
    
    history.push('/movies');
  }
 
    return (
      <div className="App" >
            
        <h1 className='large text-primary'>Add Movie</h1>
        <h2>Hello, {fullname}!</h2>
        <div className="App" style={{ width : "500px", marginLeft : "33%", padding: "1rem", marginBottom: "1rem", marginTop:"0,5rem"}}>
            
          <form className='form' onSubmit={e => customSubmit(e)} >
            <div className='form-group'>
              Name: &nbsp; &nbsp; <input type="text" onChange={e => setMovie({ ...movie, name: e.target.value })} /></div>
            <div className='form-group'>
              Genres: &nbsp; <input type="text" onChange={e => setMovie({ ...movie, genres: e.target.value })} /></div>
            <div className='form-group' >
              Premiered: <input type="text" onChange={e => setMovie({ ...movie, premiered: e.target.value })} /></div>
            <div className='form-group'>
            Image: &nbsp; <input type="text" onChange={e => setMovie({ ...movie, image: e.target.value })} /></div>
            
       
            <input type="submit" className='btn btn-primary' value="Save Data" /> &nbsp;
            <input type = "button" className='btn btn-primary btn-dark' value="Cancel" onClick={cancelMovie} />
          </form> 
         
  
            
           
        </div>
         
      </div>
    );
  }
  
  export default AddMovieComp;