import React, { Component } from 'react';
import ContractsList from '../components/ContractsList';


class Contracts extends Component {

   
    render() {
        return (
            <div className="container">
                <ContractsList/>
            </div>
        );
    }
}

export default Contracts;