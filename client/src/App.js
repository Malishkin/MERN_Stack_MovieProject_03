import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { MainPage } from './components/dashboard/MainPage';
import AddMovieComp from './components/dashboard/AddMovie';
import UpdateMovieComp from './components/dashboard/UpdateMovie';
import { MembersComp } from './components/dashboard/Members';
import UpdateMemberComp from './components/dashboard/UpdateMember';
import AddMemberComp from './components/dashboard/AddMember';


import './App.css';

const App = ()=> {
  return (
    
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>   
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/movies/:movieId' component={MainPage} />
            <Route exact path='/movies' component={MainPage} />
            <Route path='/addmovie' component={AddMovieComp} />
            <Route path='/updatemovie/:id' component={UpdateMovieComp} />
            <Route path='/members' component={MembersComp} />
            <Route path='/updatemember/:id' component={UpdateMemberComp} />
            <Route path='/addmember' component={AddMemberComp} />
            
            


          </Switch>
        </section>
      </Fragment>
      </Router>
      
  );
}

export default App;
