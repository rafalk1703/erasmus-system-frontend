import React, { Component } from 'react';
import UploadFile from '../components/UploadFile';
import EditionsList from '../components/EditionsList';

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