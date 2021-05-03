import React, { Component } from 'react';
import './App.css';
import UserComponent from './components/UserComponent'



class App extends Component {


  render() {
    return (
      <div className = 'App'> 
        <UserComponent />
      </div>
    );
  }
}

export default App;
