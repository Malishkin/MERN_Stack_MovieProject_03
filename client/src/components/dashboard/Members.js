
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import MemmberComp from './Member';


export const MembersComp = () =>
{
    const history = useHistory();
  const [members, setMembers] = useState([]);
  
  
  
   
  
    const fullname = sessionStorage.getItem('name');
    const token = sessionStorage.getItem('token');
    

    useEffect(() =>
    {
      if(!token || !fullname)
      {
        history.push("/login")
      }

      async function fetchData ()
      {
        let resp = await axios.get('/api/members');
        
        setMembers(resp.data)
      }

      fetchData();

    }, [])

   

 
   
    return (
        <div  >
            <h1 className='large text-primary'>All Members</h1>
            <h2>Hello, {fullname}!</h2>
            
        
            
        {
         
              
                members.map(item =>
                 {
                     return <MemmberComp key={item._id} membersData={item }/>
                })
               
          
          
        }

       
       
        
       
            
        </div>
    )
}
