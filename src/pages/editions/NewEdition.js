import React, { Component } from 'react';
import UploadFile from '../../components/editions/UploadFile';
import Cookies from "js-cookie";

class NewEdition extends Component {

  checkCookies() {
    if (Cookies.get('sessionCode') === undefined) {
      window.location.reload();
    }
  }

  render() {
    this.checkCookies();
    return (
      <div className="container">
      <UploadFile/>
      </div>
    );
  }
}

export default NewEdition;