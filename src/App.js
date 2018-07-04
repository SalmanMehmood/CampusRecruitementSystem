import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router , Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Login from './components/login';
import Signup from './components/signup';
import * as firebase from 'firebase';
import Student from './components/studentPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
      <div>
        <Navigation/>
        <Route exact path="/" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/studentlogin" component={Student}/>
      </div>    
   </Router>
      </div>
    );
  }
}

export default App;
