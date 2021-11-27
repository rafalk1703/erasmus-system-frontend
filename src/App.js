import React, { Component } from 'react';
import './App.css';
import Navbar2 from './components/Navbar2';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import Contracts from './pages/Contracts';
import Coordinators from './pages/Coordinators';
import Qualification from './pages/Qualification';
import Editions from './pages/editions/Editions';
import NewEdition from './pages/editions/NewEdition';
import EditionStatistics from './pages/editions/EditionStatistics';
import EditEdition from './pages/editions/EditEdition';
import MainPage from "./pages/MainPage";
import Students from "./pages/Students";
import Cookies from "js-cookie";

class App extends Component {

  render() {
    return (
      <>
        <Router>
          { Cookies.get('sessionCode') === undefined ?
              <nav className="navbar navbar-expand-lg navbar-mainbg">
                <NavLink className="navbar-brand navbar-logo" to="/" exact>
                  Erasmus System
                </NavLink>
              </nav>
              :
              <Navbar2/>
          }
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/contracts'> {Cookies.get('sessionCode') === undefined ? <Redirect to="/" /> : <Contracts/>} </Route>
            <Route path='/coordinators'> {Cookies.get('sessionCode') === undefined ? <Redirect to="/" /> : <Coordinators/>} </Route>
            <Route path='/students'> {Cookies.get('sessionCode') === undefined ? <Redirect to="/" /> : <Students/>} </Route>
            <Route path='/qualification'> {Cookies.get('sessionCode') === undefined ? <Redirect to="/" /> : <Qualification/>} </Route>
            <Route path='/editions'> {Cookies.get('sessionCode') === undefined ? <Redirect to="/" /> : <Editions/>} </Route>
            <Route path='/newEdition'> {Cookies.get('sessionCode') === undefined ? <Redirect to="/" /> : <NewEdition/>} </Route>
            <Route path='/editionStatistics/:id'> {Cookies.get('sessionCode') === undefined ? <Redirect to="/" /> : <EditionStatistics/>} </Route>
            <Route path='/editEdition/:id'> {Cookies.get('sessionCode') === undefined ? <Redirect to="/" /> : <EditEdition/>} </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;