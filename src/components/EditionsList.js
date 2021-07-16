import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import "./EditionsList.css";
import EditionService from '../services/EditionService';

class EditionsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editions: []
        }
        this.deleteEdition = this.deleteEdition.bind(this);
    }

    deleteEdition(year) {
        EditionService.deleteEdition(year).then( res => {
            this.setState({editions: this.state.editions.filter(editions => editions.year !== year)})
        });
    }

    componentDidMount() {
        EditionService.getAllEditions().then((response) => {
            this.setState({ editions: response.data })
        });
    }

        render() {
            return (
                <div>
                    <h1 className='text-center'>Editions List</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Edition Id</td>
                                <td>Year</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.editions.map(
                                    editions =>
                                        <tr key={editions.id}>
                                            <td> {editions.id} </td>
                                            <td> {editions.year} </td>
                                            <td>
                                                <Button id="details" variant="outline-primary">Szczegóły Edycji</Button>
                                                <Button onClick={ () => this.deleteEdition(editions.year)} id="delete" variant="outline-primary">Usuń Edycję</Button>
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