import React, { Component } from 'react';
import QualificationContracts from "../components/QualificationContracts";
import QualificationDepartment from '../components/QualificationDepartment';
import Cookies from "js-cookie";

class Qualification extends Component {
  render() {
    return (
        <div className='container'>
            { Cookies.get('coordinatorRole') === 'CONTRACTS' ?
                <QualificationContracts/>
                : Cookies.get('coordinatorRole') === 'DEPARTMENT' ?
                    <QualificationDepartment/>
                    : ""
            }
        </div>
    );
  }
}

export default Qualification;