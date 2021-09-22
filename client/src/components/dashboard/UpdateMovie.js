
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from 'axios';

function UpdateMovieComp (props)
{
  
 

  const fullname = sessionStorage.getItem('name');
  const token = sessionStorage.getItem('token');
  const history = useHistory();
  const [movie, setMovie] = useState([]);
  const params = useParams();
  
    useEffect( () =>
    {
      if(!token || !fullname)
      {
        history.push("/login")
      }
      async function fetchData(){
      let resp = await axios.get('/api/movies/' + params.id);
        setMovie(resp.data);
      } fetchData();
      
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
      await axios.put('/api/movies/'+ params.id, obj);
      
      history.push('/movies');
  }
  
  const cancelUpdate = () =>
  {
    
    history.push('/movies');
  }
 
    return (
      <div className="App" >
            
        <h1 className='large text-primary'>Update Movie</h1>
        <h2>Hello, {fullname}!</h2>
        <div className="App" style={{ width: "500px", marginLeft: "33%", padding: "1rem", marginBottom: "1rem", marginTop: "0,5rem" }}>
        <form className='form' onSubmit={e => customSubmit(e)} >
            <div className='form-group'>
              Name: &nbsp; &nbsp; <input type="text" value={movie.name}  onChange={e => setMovie({ ...movie, name: e.target.value })} /></div>
            <div className='form-group'>
              Genres: &nbsp; <input type="text" value={movie.genres} onChange={e => setMovie({ ...movie, genres: e.target.value })} /></div>
            <div className='form-group' >
              Premiered: <input type="text" value={movie.premiered} onChange={e => setMovie({ ...movie, premiered: e.target.value })} /></div>
            <div className='form-group'>
            Image: &nbsp; <input type="text" value={movie.image} onChange={e => setMovie({ ...movie, image: e.target.value })} /></div>
            
       
       <input type="submit" className='btn btn-primary' value="Save Data" />&nbsp;
       <input type = "button" className='btn btn-primary btn-dark' value="Cancel" onClick={cancelUpdate} />
     </form>
  
            
          
            
           
        </div>
         
      </div>
    );
  }
  
  export default UpdateMovieComp;