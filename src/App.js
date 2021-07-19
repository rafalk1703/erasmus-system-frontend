import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contracts from './pages/Contracts';
import Coordinators from './pages/Coordinators';
import Qualification from './pages/Qualification';
import Editions from './pages/Editions';
import NewEdition from './pages/NewEdition';
import EditionStatistics from './pages/EditionStatistics';



class App extends Component {


  render() {
    return (
      <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/contracts' exact component={Contracts} />
          <Route path='/coordinators' component={Coordinators} />
          <Route path='/qualification' component={Qualification} />
          <Route path='/editions' component={Editions} />
          <Route path='/newEdition' component={NewEdition} />
          <Route path='/editionStatistics/:year' component={EditionStatistics} />
        </Switch>
      </Router>
    </>
    );
  }
}

export default App;
