import React, { Component } from 'react';
import Statistics from '../../components/editions/Statistics';


class EditionStatistics extends Component {
  render() {
    return (
      <div className="container">
      <Statistics id={this.props.match.params.id} />
      </div>
    );
  }
}

export default EditionStatistics;