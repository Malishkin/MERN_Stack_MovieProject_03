import { useHistory } from "react-router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

 
import 'bootstrap/dist/css/bootstrap.css'



function MemmberComp (props)
{
  const [currentMemberSubscriptions, setCurrentMemberSubscriptions] = useState([]);
 
  const [moviesNotSubscribed, setMoviesNotSubscribed] = useState([]);
  
  const [showSubscriptionForm, setShowSubscribtionForm] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  

    
  useEffect(() =>
    {
        async function fetchData() {
          
          let resp = await axios.get('/api/subscriptions');
          
          let memberSubscriptions = resp.data.filter(x => x.member._id === props.membersData._id);
          
          setCurrentMemberSubscriptions(memberSubscriptions);
          console.log("memberSubscriptions:\n", memberSubscriptions);

          let memberMoviesIds = memberSubscriptions.map(subscription => subscription.movie._id);
          
          console.log("currentMemberMoviesIds:\n", memberMoviesIds);

          resp = await axios.get('/api/movies');
          console.log('/api/movies:\n', resp.data);
        
          
         
          let memberNotSubscribedMovies = resp.data.filter(
              movie => !memberMoviesIds.includes(movie._id));
         

          console.log("moviesNotSubscribed :\n", memberNotSubscribedMovies);
          setMoviesNotSubscribed(memberNotSubscribedMovies);
          
          
        }
        fetchData();
   }, [])


  const history = useHistory();
  const update = () =>
  {
    history.push('/updatemember/' + props.membersData._id)
    
  }
  
  const deleteMember = () =>
  {
    
    // if (window.confirm("You want to delete?"))
    // {
    //   alert("You agreed");
    // }
    // else
    // {
    //   alert("you canceled");
    // }

    //await axios.delete('/api/members/' + props.membersData._id);

  
  
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
        axios.delete('/api/members/' + props.membersData._id);
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

  const customSubmit = async(e) => {
    e.preventDefault();

    

    let newSubscription = {
      member: props.membersData._id,
      movie: selectedMovieId, 
      date: selectedDate
    }
    
    console.log("new subscription is:", newSubscription);

    await axios.post('/api/subscriptions', newSubscription);
    
    history.push('/movies');
    
  }
  
  const cancelMovie = () =>
  {
    window.location.reload();
  }

  const onMovieSelected = (event) =>
  {
    setSelectedMovieId(event.target.value);
  }

  

    return (
      <div className="App" style={{borderStyle : "solid", borderRadius: "3%", width : "450px", marginLeft : "33%", padding: "1rem", marginBottom: "1rem", marginTop:"0,5rem"}}>
            
        <p>
          Name : {props.membersData.name} <br/><br/>
          Email : {props.membersData.email} <br/><br/>
          City : {props.membersData.city} <br /><br />
          
         
        </p>

        <h4>Movies subscribed:</h4>
        {
          
          currentMemberSubscriptions.map(item =>
            {
            return <li key={item._id}> <Link to={'/movies/' + item.movie._id}>{item.movie.name}</Link> on {item.date.slice(0, 10)}</li>
            } )
          
        } <br /><br />
        
        &nbsp; &nbsp; &nbsp;
        <input type="button" className="btn btn-primary" value="Subscribe to new movie"
          onClick={() => setShowSubscribtionForm(!showSubscriptionForm)} />
        <br /><br />
        &nbsp; &nbsp; &nbsp;
        {
          showSubscriptionForm ?
          <form className='form' onSubmit={e => customSubmit(e)} > 

              <select className='form select' onChange={onMovieSelected} value={selectedMovieId}>
                  <option value="Pick a movie">Pick a movie</option>
                  {moviesNotSubscribed.map(movie =>
                  {
                    return <option key={movie._id} value={movie._id}>{movie.name}</option>;
                  })}
                </select>

              &nbsp;
              
              <input type="date" onChange={e => setSelectedDate( e.target.value )} /> <br /><br />
              
              <input type="submit" className='btn btn-primary' value="Subscribe" /> &nbsp;
            <input type = "button" className='btn btn-primary btn-dark' value="Cancel" onClick={cancelMovie} />
          </form>  : ''
        }

       <br /><br />  
        
    
       
        
   &nbsp; &nbsp; &nbsp; <input className="btn btn-success" type="button" value="Edit member" onClick={update} /> &nbsp;
        <input className="btn btn-danger" type="button" value="Delete member" onClick={deleteMember} />

        

         
      </div>
    );
  }
  
export default MemmberComp
  