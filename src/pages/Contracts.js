import React, { Component } from 'react';
import ContractsList from '../components/ContractsList';
import Cookies from "js-cookie";


class Contracts extends Component {

    checkCookies() {
        if (Cookies.get('sessionCode') === undefined) {
            window.location.reload();
        }
    }
   
    render() {
        this.checkCookies();
        return (
            <div className="container">
                <ContractsList/>
            </div>
        );
    }
}

export default Contracts;