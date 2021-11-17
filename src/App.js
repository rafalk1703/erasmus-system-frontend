import React, { Component } from 'react';
import './App.css';
import Navbar2 from './components/Navbar2';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
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
            <Route path='/contracts' component={Contracts} />
            <Route path='/coordinators' component={Coordinators} />
            <Route path='/students' component={Students} />
            <Route path='/qualification' component={Qualification} />
            <Route path='/editions' component={Editions} />
            <Route path='/newEdition' component={NewEdition} />
            <Route path='/editionStatistics/:id' component={EditionStatistics} />
            <Route path='/editEdition/:id' component={EditEdition} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;