import React, { Component } from 'react';
import ContractService from '../services/ContractService';
import { Accordion, Card, Button } from "react-bootstrap";
import { MenuItem, InputLabel } from '@material-ui/core';
import Select from "react-select";
import "./ContractList.css";


class ContractsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            all: [],
            contracts: [],
            faculty: "",
            coordinator: "",
            degree: "",
        }
    }

    componentDidMount() {
        ContractService.getAllContracts().then((response) => {
            this.setState({ 
                all: response.data.body,
                contracts: response.data.body })
        });
    }

    filteringFacultys = (e) => {
        let faculty = e.target.value;
        if (faculty === "") {
            this.setState({
                faculty: faculty,
                contracts: this.state.all,
            })
        }
        else {
            this.setState({
                faculty: faculty,
                contracts: this.state.all.filter(contract=> {
                    return contract.faculty.indexOf(e.target.value)>=0
                }),
            })
        }
    }

    filteringCoordinators = (e) => {
        let coordinator = e.target.value;
        if (coordinator === "") {
            this.setState({
                coordinator: coordinator,
                contracts: this.state.all,
            })
        }

        else {
            this.setState({
                coordinator: coordinator,
                contracts: this.state.all.filter(contract=> {
                    return contract.contractCoordinator.name.indexOf(e.target.value)>=0
                }),
            })
        }
    }

    filteringDegree = (e) => {
        let degree = e.target.value;
        if (degree === "") {
            this.setState({
                degree: degree,
                contracts: this.state.all,
            })
        }

        else {
            this.setState({
                degree: degree,
                contracts: this.state.all.filter(contract=> {
                    return contract.degree.indexOf(e.target.value)>=0
                }),
            })
        }
    }



    render() {

        // const filteredByFaculty = this.state.contracts.filter(contract => {
        //     return contract.faculty.toLowerCase().include(search.toLowerCase())
        // })
        let uniqueFacultys = [new Set(this.state.contracts.map((contract) => (contract.faculty)))];
        let uniqueCoordinators = [new Set(this.state.contracts.map((contract) => (contract.contractCoordinator.name)))];
        return (
            <div>
                <h1 className='text-center'>Lista Kontraktów</h1>
                <div className='text-center' id="filter-box">
                    <div class='select' id="filter-select">

                        <InputLabel id="label">Wydział:</InputLabel>
                        <select onChange={this.filteringFacultys}>
                            <option value="">All</option>
                           
                            <option value="WIEiT">WIEiT</option>
                            

                        </select>


                    </div>
                    <div class='select' id="filter-text">
                        <InputLabel id="label">Koordynator:</InputLabel>
                        <select onChange={this.filteringCoordinators}>
                           
                            <option value="">All</option>
                            
                            <option value="dr inż. Tomasz Marcin Orzechowski">dr inż. Tomasz Marcin Orzechowski</option>

                        </select>
                    </div>
                    <div class='select' id="filter-text">
                        <InputLabel id="label">Stopień:</InputLabel>
                        <select onChange={this.filteringDegree}>
                           
                            <option value="">All</option>
                            
                            <option value="1st">1st</option>

                            <option value="2st">2st</option>

                            <option value="3st">3st</option>

                        </select>
                    </div>
                    
                </div>
                <br></br>
                <Accordion>
                    {
                        this.state.contracts.map(
                            contract =>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey={contract.id}>
                                        {contract.erasmusCode}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={contract.id}>
                                        <Card.Body>
                                            <ul>
                                                <li>Wydział: {contract.faculty}</li>
                                                <li>Koordynator: {contract.contractCoordinator.name}</li>
                                                <li>Rok: {contract.startYear}-{contract.endYear}</li>
                                                <li>Stopień studiów: {contract.degree}</li>
                                                <li>Ilość miejsc: {contract.vacancies} miejsca</li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                        )
                    }
                </Accordion>
            </div >
        );
    }

}

export default ContractsList;