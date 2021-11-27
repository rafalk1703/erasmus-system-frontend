import React, { Component } from 'react';
import EditionsList from '../../components/editions/EditionsList';
import Cookies from "js-cookie";

class Editions extends Component {

  checkCookies() {
    if (Cookies.get('sessionCode') === undefined) {
      window.location.reload();
    }
  }

  render() {
    this.checkCookies();
    return (
      <div className="container">
      <EditionsList/>
      </div>
    );
  }
}

export default Editions;