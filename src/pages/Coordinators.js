import React, { Component } from 'react';
import CoordinatorsList from '../components/CoordinatorsList';
import Cookies from "js-cookie";


class Coordinators extends Component {

    checkCookies() {
        if (Cookies.get('sessionCode') === undefined) {
            window.location.reload();
        }
    }
   
    render() {
        this.checkCookies();
        return (
            <div className="container">
                <CoordinatorsList/>
            </div>
        );
    }
}

export default Coordinators;