import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import "./EditionsList.css";
import EditionService from '../services/EditionService';

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

        const renderDeactivateButton = (isActive, id) => {
            if (isActive) {
                return <Button onClick={() => this.deactiveEdition(id)} id="deactive" variant="outline-primary">Archiwizuj Edycję</Button>;
            } else {
                return "";
            }
        }

        const renderEditButton = (isActive, id) => {
            if (isActive) {
                return <Link to={`/editEdition/${id}`}>
                <Button id="details" variant="outline-primary">Edytuj Edycję</Button>
            </Link>;
            } else {
                return "";
            }
        }
        return (
            <div>
                <h1 className='text-center'>Lista edycji</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Czy aktywna</td>
                            <td>Edycja</td>
                            <td></td>
                            <td>Listy</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.editions.map(
                                editions =>
                                    <tr key={editions.id}>
                                        <td>{renderIsActive(editions.isActive)}</td>
                                        <td> {editions.year} </td>
                                        <td>
                                            {renderEditButton(editions.isActive, editions.id)}
                                            <Link to={`/editionStatistics/${editions.id}`}>
                                                <Button id="details" variant="outline-primary">Szczegóły Edycji</Button>
                                            </Link>

                                            <Button onClick={() => this.deleteEdition(editions.id)} id="delete" variant="outline-primary">Usuń Edycję</Button>
                                            {renderDeactivateButton(editions.isActive, editions.id)}
                                        </td>
                                        <td><div class="btn-group-vertical">
                                            <a download href={"http://localhost:8080/api/file/generate/" + editions.id} id="generate" class="btn btn-outline-primary" variant="outline-primary" rel="noreferrer" target="_blank">Pobierz Listę spoza WIEIT</a>
                                            <a download href={"http://localhost:8080/api/file/generate/WIEIT/" + editions.id} id="generate_wieit" class="btn btn-outline-primary" variant="outline-primary" rel="noreferrer" target="_blank">Pobierz Listę WIEIT</a>
                                            </div>
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