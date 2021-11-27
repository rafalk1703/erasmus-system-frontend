import React, { Component } from 'react';
import Statistics from '../../components/editions/Statistics';
import {withRouter} from "react-router-dom";
import Cookies from "js-cookie";


class EditionStatistics extends Component {

  checkCookies() {
    if (Cookies.get('sessionCode') === undefined) {
      window.location.reload();
    }
  }

  render() {
    this.checkCookies();
    return (
      <div className="container">
      <Statistics id={this.props.match.params.id} />
      </div>
    );
  }
}

export default withRouter(EditionStatistics);