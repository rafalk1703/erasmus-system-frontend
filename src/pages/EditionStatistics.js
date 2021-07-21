import React, { Component } from 'react';
import Statistics from '../components/Statistics';


class EditionStatistics extends Component {
  render() {
    return (
      <div className="container">
      <Statistics year={this.props.match.params.year}/>
      </div>
    );
  }
}

export default EditionStatistics;