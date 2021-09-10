import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import {Alert} from 'react-bootstrap';
import "./EditionsList.css";
import EditionService from '../services/EditionService';
import { Last } from 'react-bootstrap/esm/PageItem';

class EditionsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editions: []
        }
        this.deleteEdition = this.deleteEdition.bind(this);
        this.deactiveEdition = this.deactiveEdition.bind(this);
    }

    deleteEdition(id) {
        EditionService.deleteEdition(id).then(res => {
            this.setState({ editions: this.state.editions.filter(editions => editions.id !== id) })
        });
    }

    deactiveEdition(id) {
        EditionService.deactiveEdition(id).then(res => {
            this.setState({})
        });
        window.location.reload();
    }


    componentDidMount() {
        EditionService.getAllEditions().then((response) => {
            this.setState({ editions: response.data })
        });
    }

    render() {

        const renderIsActive = (isActive) => {
            if (isActive) {
                return <Alert variant="success">aktywna</Alert>;
            } else {
                return <Alert variant="danger">nieaktywna</Alert>;
            }
        }
        return (
            <div>
                <h1 className='text-center'>Editions List</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>IsActive</td>
                            <td>Edition Id</td>
                            <td>Year</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.editions.map(
                                editions =>
                                    <tr key={editions.id}>
                                        <td>{renderIsActive(editions.isActive)}</td>
                                        <td> {editions.id} </td>
                                        <td> {editions.year} </td>
                                        <td>
                                            <Link to={`/editionStatistics/${editions.id}`}>
                                                <Button id="details" variant="outline-primary">Szczegóły Edycji</Button>
                                            </Link>
                                            <Button onClick={() => this.deleteEdition(editions.id)} id="delete" variant="outline-primary">Usuń Edycję</Button>
                                            <Button onClick={() => this.deactiveEdition(editions.id)} id="deactive" variant="outline-primary">Archiwizuj Edycję</Button>
                                        </td>
                                    </tr>
                            )
                        }



                    </tbody>
                </Table>

                <Link to="/newEdition">
                    <Button variant="outline-primary" type="button">
                        Dodaj nową edycję
                    </Button>
                </Link>
            </div>
        );
    }
}

export default EditionsList;