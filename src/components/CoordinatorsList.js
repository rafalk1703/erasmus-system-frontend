import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import "./CoordinatorsList.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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
                    CoordinatorsService.getAllCoordinatorsByEdition(response1.data.id).then((response) => {
                        this.setState({ coordinators: response.data.body })
                    });


                });
            })()
        } catch (err) {

        }
    
    }

    render() {

        const renderNotifyButton = (ifAccepted, id) => {
            if (ifAccepted) {
                return <Button id="nofity" variant="outline-danger disabled">Powiadom</Button>;
            } else {
                return <Button onClick={() => {CoordinatorsService.nofityCoordinator(id); NotificationManager.success('Powiadomienie zostało wysłane', 'Sukces!')}} id="nofity" variant="outline-danger">Powiadom</Button>;
            }
        }

        const renderIfAccepted = (ifAccepted) => {
            console.log(ifAccepted);
            if (ifAccepted) {
                return <Alert variant="success">Zaakceptował</Alert>;
            } else {
                return <Alert variant="danger">Niezaakceptował</Alert>;
            }
        }


        return (
            <div>
                <NotificationContainer/>
                <h1 className = 'text-center'>Lista Koordynatorów</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Imię</td>
                            <td>Kod</td>
                            <td>Email</td>
                            <td>Czy zaakceptował</td>
                            <td></td>
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
                                    <td> {renderIfAccepted(coordinator.ifAccepted)} </td>
                                    <td> {renderNotifyButton(coordinator.ifAccepted, coordinator.id)} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CoordinatorsList;