import React, { Component } from 'react';
import CoordinatorsService from '../services/CoordinatorsService';
import EditionService from '../services/EditionService';


class CoordinatorsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            coordinators: []
        }
    }

    componentDidMount() {

        try {
            (async () => {
                await EditionService.getActiveEdition().then((response1) => {
                    CoordinatorsService.getAllCoordinatorsEdition(response1.data.year).then((response) => {
                        this.setState({ coordinators: response.data.body })
                    });


                });
            })()
        } catch (err) {

        }
    
    }

    render() {
        return (
            <div>
                <h1 className = 'text-center'>Coordinators List</h1>
                <table className = 'table table-striped'>
                    <thead>
                        <tr>
                            <td>Imię</td>
                            <td>Kod</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.coordinators.map(
                                coordinator => 
                                <tr key = {coordinator.id}>
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