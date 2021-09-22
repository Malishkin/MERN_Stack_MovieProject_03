import { useHistory } from "react-router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import 'bootstrap/dist/css/bootstrap.css'

function MoviesComp (props)
{
  const history = useHistory();
  
 
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);



  
  useEffect(() =>
    {
        async function fetchData() {
          
            let resp = await axios.get('/api/subscriptions');
            console.log('/api/subscriptions: ' + JSON.stringify(resp.data))
            
           let subscribedToMovie = await resp.data.filter(x => x.movie._id === props.moviesData._id);
           setFilteredSubscriptions(subscribedToMovie);
          
            
        }
        fetchData();
    }, [])

  

 
  
    const update = () =>
    {
      history.push('/updatemovie/' + props.moviesData._id)
    
    }
  
    // const deleteMovie = async () =>
    // {
      
    //   await axios.delete('/api/movies/' + props.moviesData._id);
      
    //   window.location.reload();
    // }
  
  
const deleteMovie = () =>
{
  
 



  const MySwal = withReactContent(Swal);
 

  const swalWithBootstrapButtons = MySwal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) =>
  {
    if (result.isConfirmed) {
      axios.delete('/api/movies/' + props.moviesData._id);
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      ).then(function(){
        window.location.reload();
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
})

  
}
 
    return (
      <div className="App" style={{ borderStyle: "solid", width: "500px", marginLeft: "33%", padding: "1rem", marginBottom: "1rem", marginTop: "0,5rem" }}>
            
         
  
        Name : {props.moviesData.name} <br /><br />
        Genres : {props.moviesData.genres + ' , '} <br /><br />
        Premiered Year : {props.moviesData.premiered.slice(0, 10)} <br /><br />
        <img src={props.moviesData.image} />  <br /><br />

        {
          
          filteredSubscriptions.map(item =>
            {
             return <li key={item._id}>Subscribed by :  <Link to='/members' >{item.member.name}</Link> on {item.date.slice(0,10)}</li>
              })
        }  <br /><br />

        
       
       
        
        <input className="btn btn-success" type="button" value="Edit movie" onClick={update} /> &nbsp;
        <input className="btn btn-danger" type="button" value="Delete movie" onClick={deleteMovie} />

       

        

         
      </div>
    );
  }


  export default MoviesComp;