import React, { Component } from 'react';
import CoordinatorsService from '../services/CoordinatorsService';


class CoordinatorsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            coordinators: []
        }
    }

    componentDidMount() {
        CoordinatorsService.getAllCoordinators().then((response) => {
            this.setState({ coordinators: response.data.body })
        });
    }

    render() {
        return (
            <div>
                <h1 className = 'text-center'>Coordinators List</h1>
                <table className = 'table table-striped'>
                    <thead>
                        <tr>
                            <td>Contract Id</td>
                            <td>Name</td>
                            <td>Surname</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.coordinators.map(
                                coordinator => 
                                <tr key = {coordinator.id}>
                                    <td> {coordinator.id} </td>
                                    <td> {coordinator.name} </td>
                                    <td> {coordinator.code} </td>
                                    <td> {coordinator.email} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CoordinatorsList;