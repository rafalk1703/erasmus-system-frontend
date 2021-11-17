import React, { Component } from 'react';
import EditionsList from '../../components/editions/EditionsList';

class Editions extends Component {
  render() {
    return (
      <div className="container">
      <EditionsList/>
      </div>
    );
  }
}

export default Editions;