import React, { Component } from 'react';


class EditionStatistics extends Component {
  render() {
    return (
      <div className="container">
      Statystyki edycji {this.props.match.params.year}
      </div>
    );
  }
}

export default EditionStatistics;