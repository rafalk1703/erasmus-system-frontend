import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contracts from './pages/Contracts';
import Coordinators from './pages/Coordinators';
import Qualification from './pages/Qualification';
import Editions from './pages/Editions';
import NewEdition from './pages/NewEdition';
import EditionStatistics from './pages/EditionStatistics';
import EditEdition from './pages/EditEdition';




class App extends Component {


  render() {
    return (
      <>
      <Router>
        <Navbar2/>
        <Switch>
          <Route path='/contracts' exact component={Contracts} />
          <Route path='/coordinators' component={Coordinators} />
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
