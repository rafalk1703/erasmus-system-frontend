import React, { Component } from 'react';
import ContractService from '../services/ContractService';


class ContractsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contracts: []
        }
    }

    componentDidMount() {
        ContractService.getAllContracts().then((response) => {
            this.setState({ contracts: response.data.body })
        });
    }

    render() {
        return (
            <div>
                <h1 className = 'text-center'>Contracts List</h1>
                <table className = 'table table-striped'>
                    <thead>
                        <tr>
                            <td>Contract Id</td>
                            <td>Erasmus Code</td>
                            <td>Vacancies</td>
                            <td>Degree</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.contracts.map(
                                contract => 
                                <tr key = {contract.id}>
                                    <td> {contract.id} </td>
                                    <td> {contract.erasmusCode} </td>
                                    <td> {contract.vacancies} </td>
                                    <td> {contract.degree} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ContractsList;