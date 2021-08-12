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
                contracts: response.data.body
            })
        });
    }

    filteringFacultys = (e) => {
        let faculty = e.value;
        if (faculty === "") {
            this.setState({
                faculty: faculty,
                contracts: this.state.all.filter(contract => {
                    return contract.contractCoordinator.name.indexOf(this.state.coordinator) >= 0 &&
                        contract.degree.indexOf(this.state.degree) >= 0
                }),
            })
        }
        else {
            this.setState({
                faculty: faculty,
                contracts: this.state.all.filter(contract => {
                    return contract.contractCoordinator.name.indexOf(this.state.coordinator) >= 0 &&
                        contract.degree.indexOf(this.state.degree) >= 0 &&
                        contract.faculty.indexOf(faculty) >= 0
                }),
            })
        }
    }

    filteringCoordinators = (e) => {
        let coordinator = e.value;
        if (coordinator === "") {
            this.setState({
                coordinator: coordinator,
                contracts: this.state.all.filter(contract => {
                    return contract.degree.indexOf(this.state.degree) >= 0 &&
                        contract.faculty.indexOf(this.state.faculty) >= 0
                }),
            })
        }

        else {
            this.setState({
                coordinator: coordinator,
                contracts: this.state.all.filter(contract => {
                    return contract.contractCoordinator.name.indexOf(coordinator) >= 0 &&
                        contract.degree.indexOf(this.state.degree) >= 0 &&
                        contract.faculty.indexOf(this.state.faculty) >= 0
                }),
            })
        }
    }

    filteringDegree = (e) => {
        let degree = e.value;
        console.log("DEGREEEEEE" + degree);

        if (degree === "") {
            this.setState({
                degree: degree,
                contracts: this.state.all.filter(contract => {
                    return contract.contractCoordinator.name.indexOf(this.state.coordinator) >= 0 &&
                        contract.faculty.indexOf(this.state.faculty) >= 0
                }),
            })
        }

        else {
            this.setState({
                degree: degree,
                contracts: this.state.all.filter(contract => {
                    return contract.contractCoordinator.name.indexOf(this.state.coordinator) >= 0 &&
                        contract.degree.indexOf(degree) >= 0 &&
                        contract.faculty.indexOf(this.state.faculty) >= 0
                }),
            })
        }
    }



    render() {

        const degreeOptions = [
            { label: "All", value: "" },
            { label: "1st", value: "1st" },
            { label: "2st", value: "2st" },
            { label: "3st", value: "3st" }

        ];
    
        let uniqueCoordinatorOptions = [...new Set(this.state.all.map((contract) => (contract.contractCoordinator.name)))];

        const coordinatorOptions = uniqueCoordinatorOptions.map((coordinator) => ({
            value: coordinator,
            label: coordinator
        }))

        coordinatorOptions.push({
            value: "",
            label: "All"
        })

        let uniqueFacultyOptions = [...new Set(this.state.contracts.map((contract) => (contract.faculty)))];

        const facultyOptions = uniqueFacultyOptions.map((faculty) => ({
            value: faculty,
            label: faculty
        }))

        facultyOptions.push({
            value: "",
            label: "All"
        })

        return (
            <div>
                <h1 className='text-center'>Lista Kontraktów</h1>
                <div className='text-center' id="filter-box">
                <br></br>
                    <div class='select' id="filter-select">
                        <InputLabel id="label">Wydział:</InputLabel>
                        <Select options={facultyOptions} onChange={this.filteringFacultys} placeholder="All" />
                    </div>
                    <div class='select' id="filter-text">
                        <InputLabel id="label">Koordynator:</InputLabel>
                        <Select options={coordinatorOptions} onChange={this.filteringCoordinators} placeholder="All" />
                    </div>
                    <div class='select' id="filter-text">
                        <InputLabel id="label">Stopień:</InputLabel>
                        <Select options={degreeOptions} onChange={this.filteringDegree} placeholder="All" />
                    </div>
                    <br></br>
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