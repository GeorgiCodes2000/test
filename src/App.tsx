import React, { Fragment, useState } from 'react';
import './App.css';
import { Register } from './components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Login } from './components/Login';
import { Home } from './components/Home';


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
  // console.log(user.user.email)
  
  return (
    <Fragment> 
      <Router>  
        <Routes>
            <Route path='/' element={<Home user={user.user}/>}/>
            <Route path='/register' element={<Register user={user.user} setUser={setUser}/>}/>
            <Route path='/login' element={<Login user={user.user} />} />
        </Routes>
      </Router>
     </Fragment>
  );
}

export default App;
