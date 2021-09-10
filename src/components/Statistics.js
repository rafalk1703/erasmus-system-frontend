import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import EditionService from '../services/EditionService';


class Statistics extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfContracts: "", numberOfRegistrations: "", numberOfContracts1Degree: "",
            numberOfContracts2Degree: "", numberOfContracts3Degree: "", numberOfRegistrations1Degree: "",
            numberOfRegistrations2Degree: "", numberOfRegistrations3Degree: "",
        }
    }

    componentDidMount() {
        EditionService.getStatistics(this.props.id).then((response) => {
            this.setState({
                numberOfContracts: response.data.numberOfContracts,
                numberOfRegistrations: response.data.numberOfRegistrations,
                numberOfContracts1Degree: response.data.numberOfContracts1Degree,
                numberOfContracts2Degree: response.data.numberOfContracts2Degree,
                numberOfContracts3Degree: response.data.numberOfContracts3Degree,
                numberOfRegistrations1Degree: response.data.numberOfRegistrations1Degree,
                numberOfRegistrations2Degree: response.data.numberOfRegistrations2Degree,
                numberOfRegistrations3Degree: response.data.numberOfRegistrations3Degree,
            })
        });
    }

    render() {


        return (
            <div>
                <h1 className='text-center'>Statystyki Edycji {this.props.id}</h1>

                <ListGroup>
                    <ListGroup.Item>Liczba umów: <b>{this.state.numberOfContracts}</b></ListGroup.Item>
                    <ListGroup.Item>Liczba zgłoszeń: <b>{this.state.numberOfRegistrations}</b></ListGroup.Item>
                    <ListGroup.Item>Liczba umów na studia 1 stopnia: <b>{this.state.numberOfContracts1Degree}</b></ListGroup.Item>
                    <ListGroup.Item>Liczba umów na studia 2 stopnia: <b>{this.state.numberOfContracts2Degree}</b></ListGroup.Item>
                    <ListGroup.Item>Liczba umów na studia 3 stopnia: <b>{this.state.numberOfContracts3Degree}</b></ListGroup.Item>
                    <ListGroup.Item>Liczba zgłoszeń na studia 1 stopnia: <b>{this.state.numberOfRegistrations1Degree}</b></ListGroup.Item>
                    <ListGroup.Item>Liczba zgłoszeń na studia 2 stopnia: <b>{this.state.numberOfRegistrations2Degree}</b></ListGroup.Item>
                    <ListGroup.Item>Liczba zgłoszeń na studia 3 stopnia: <b>{this.state.numberOfRegistrations3Degree}</b></ListGroup.Item>
                </ListGroup>


            </div>
        );
    }

}

export default Statistics;