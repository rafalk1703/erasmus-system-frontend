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

    deleteEdition(year) {
        EditionService.deleteEdition(year).then(res => {
            this.setState({ editions: this.state.editions.filter(editions => editions.year !== year) })
        });
    }

    deactiveEdition(year) {
        EditionService.deactiveEdition(year).then(res => {
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
                                            <Link to={`/editionStatistics/${editions.year}`}>
                                                <Button id="details" variant="outline-primary">Szczegóły Edycji</Button>
                                            </Link>
                                            <Button onClick={() => this.deleteEdition(editions.year)} id="delete" variant="outline-primary">Usuń Edycję</Button>
                                            <Button onClick={() => this.deactiveEdition(editions.year)} id="deactive" variant="outline-primary">Archiwizuj Edycję</Button>
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