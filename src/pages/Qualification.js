import React, { Component } from 'react';
import QualificationView from "../components/QualificationView";
import Cookies from "js-cookie";

class Qualification extends Component {

    checkCookies() {
        if (Cookies.get('sessionCode') === undefined) {
            window.location.reload();
        }
    }
  render() {
        this.checkCookies();
        return (
            <div className='container'>
                <QualificationView/>
            </div>
        );
  }
}

export default Qualification;