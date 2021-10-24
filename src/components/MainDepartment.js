import React, { Component } from 'react';
import { Alert, ProgressBar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./MainDepartment.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CoordinatorsService from '../services/CoordinatorsService';
import EditionService from '../services/EditionService';


class MainDepartemt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            coordinators: [],
            activeEditionYear: '',
            activeEditionId: '',
            amountOfAccepted: ''
        }

        this.nofityCoordinators = this.nofityCoordinators.bind(this);
    }

    countAcceptedCoordinators() {
        return this.state.coordinators.filter(function (coordinator) {
            return coordinator.ifAccepted === true;
        }).length
    }

    nofityCoordinators() {
        CoordinatorsService.nofityAllCoordinators(this.state.activeEditionId);
        NotificationManager.success('Powiadomienia zostały wysłane', 'Sukces!');
    }


    componentDidMount() {

        try {
            (async () => {
                await EditionService.getActiveEdition().then((response1) => {
                    CoordinatorsService.getAllCoordinatorsByEdition(response1.data.id).then((response) => {
                        this.setState({ activeEditionYear: response1.data.year })
                        this.setState({ activeEditionId: response1.data.id })
                        this.setState({ coordinators: response.data.body })
                    });


                });
            })()
        } catch (err) {

        }

    }

    render() {
        console.log(this.state);

        console.log(this.countAcceptedCoordinators());



        const renderIfActive = (activeEditionYear) => {
            if (activeEditionYear != '') {
                return <div >
                    <NotificationContainer/>

                    <div class="content">
                    <br></br>
                    <h1 class='label'><Alert variant="success" >Aktywna Edycja {activeEditionYear}</Alert></h1>
                    
                    <label>Ilu koordynatorów zaakceptowało studentów:</label>
                    <ProgressBar id="progress"
                        variant="success"
                        now={this.countAcceptedCoordinators() / this.state.coordinators.length * 100}
                        label={`${this.countAcceptedCoordinators()} z ${this.state.coordinators.length}`}
                        style = {{margin: '20px'}}>
                    </ProgressBar>
                    <div class="notifyButton">
                    <Button onClick={this.nofityCoordinators} variant="outline-primary" style = {{margin: '20px'}}>Powiadom Koordynatorów</Button>
                    </div>
                    </div>
                </div>;
            } else {
                return <div >
                <div class="content">
                    <br></br>
                    <h1 className='label'><Alert variant="danger">Brak aktywnej edycji</Alert></h1>
                    <div class="notifyButton">
                    <Link to={`/editions`}>
                    <Button variant="outline-primary" style = {{margin: '20px'}} >Stwórz nową edycję</Button>
                    </Link>
                    </div>
                </div>
                </div>;
            }
        }


        return (
            <div class="edition_info">{renderIfActive(this.state.activeEditionYear)}</div>

        );
    }
}

export default MainDepartemt;