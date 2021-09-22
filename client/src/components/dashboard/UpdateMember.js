
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from 'axios';

function UpdateMemberComp (props)
{
  
 

  const fullname = sessionStorage.getItem('name');
  const token = sessionStorage.getItem('token');
  const history = useHistory();
  const [member, setMember] = useState([]);
  const params = useParams();
  
    useEffect( () =>
    {
      if(!token || !fullname)
      {
        history.push("/login")
      }

      async function fetchData(){
  
      let resp = await axios.get('/api/members/' + params.id);
        setMember(resp.data);
      } fetchData();
      
    }, [])
  
    const customSubmit = async(e) =>
    {
      e.preventDefault();
      let obj = {
        name: member.name,
        email: member.email,
        city: member.city,
        
      }
      await axios.put('/api/members/'+ params.id, obj);
      
      history.push('/members');
  }
  
  const cancelUpdate = () =>
  {
    
    history.push('/members');
  }
 
 
    return (
      <div className="App" >
            
        <h1 className='large text-primary'>Update Member</h1>
        <h2>Hello, {fullname}!</h2>
        <div className="App" style={{ width: "500px", marginLeft: "33%", padding: "1rem", marginBottom: "1rem", marginTop: "0,5rem" }}>
        <form className='form' onSubmit={e => customSubmit(e)} >
            <div className='form-group'>
              Name: &nbsp; &nbsp; <input type="text" value={member.name}  onChange={e => setMember({ ...member, name: e.target.value })} /></div>
            <div className='form-group'>
              Email: &nbsp; <input type="text" value={member.email} onChange={e => setMember({ ...member, email: e.target.value })} /></div>
            <div className='form-group' >
              City: <input type="text" value={member.city} onChange={e => setMember({ ...member, city: e.target.value })} /></div>
            <div className='form-group'>
            </div>
            
       
            <input type="submit" className='btn btn-primary' value="Save Data" />&nbsp;
            <input type = "button" className='btn btn-primary btn-dark' value="Cancel" onClick={cancelUpdate} />
     </form>
  
            
          
            
           
        </div>
         
      </div>
    );
  }
  
  export default UpdateMemberComp;