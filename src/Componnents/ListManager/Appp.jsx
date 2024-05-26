// import './App.css'
import React from 'react';
import { BrowserRouter, BrowserRouter as  Route, Router, Routes } from 'react-router-dom';
import ListManager from './ListManager';
import Create from './Create'
import Update from './Update'
import Read from './Read'

function Appp() {
    return (
  <BrowserRouter>
  <Router>
<Router path='/' element={<ListManager />}></Router>
<Router path='/create' element={<Create />}></Router>
<Router path='/update/:id' element={<Update/>}></Router>
<Router path='/read/:id' element={<Read />}></Router>


  </Router>
  
  </BrowserRouter>
    );
}

export default Appp;
