import React, { Component } from 'react';
import ContractService from '../services/ContractService';
import { Accordion, Card, Button } from "react-bootstrap";
import { InputLabel } from '@material-ui/core';
import Select from "react-select";
import Cookies from "js-cookie";
import "./css/ContractList.css";
import EditionService from '../services/EditionService';


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

        try {
            (async () => {
                await EditionService.getActiveEdition().then((response1) => {
                    ContractService.getAllContractsByEdition(response1.data.id).then((response) => {
                        this.setState({
                            all: response.data.body,
                            contracts: response.data.body
                        })
                    });


                });
            })()
        } catch (err) {

        }

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
            { label: "Ist", value: "Ist" },
            { label: "IIst", value: "IIst" },
            { label: "IIIst", value: "IIIst" }

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

        const onFormSubmit = id => e => {
            e.preventDefault();
            
            if (e.target[0].value === "") {
                return
            }
            
            console.log(e.target[0].value)
            let body = {
                "sessionCode": Cookies.get('sessionCode'),
                "vacancies": e.target[0].value    
            };

            ContractService.changeNumberOfVacancies(id, body)
                .then(function (response) {
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
          }

        return (
            <div>
                {Cookies.get('coordinatorRole') === 'DEPARTMENT' ?
                    <h1 className='text-center'>Lista wszystkich kontrakt??w</h1>
                    : Cookies.get('coordinatorRole') === 'CONTRACTS' ?
                        <h1 className='text-center'>Lista moich kontrakt??w</h1>
                        : ""
                }
                <div className='text-center' id="filter-box">
                    <br></br>
                    {Cookies.get('coordinatorRole') === 'DEPARTMENT' ?
                        <div>
                            <div class='select' id="filter-select">
                                <InputLabel id="label">Wydzia??:</InputLabel>
                                <Select options={facultyOptions} onChange={this.filteringFacultys} placeholder="All" />
                            </div>
                            <div class='select' id="filter-text">
                                <InputLabel id="label">Koordynator:</InputLabel>
                                <Select options={coordinatorOptions} onChange={this.filteringCoordinators}
                                    placeholder="All" />
                            </div>
                        </div>
                        : ""
                    }
                    <div class='select' id="filter-text">
                        <InputLabel id="label">Stopie??:</InputLabel>
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
                                        <div class="left">
                                            <ul>
                                                <li>Wydzia??: {contract.faculty}</li>
                                                <li>Koordynator: {contract.contractCoordinator.name}</li>
                                                <li>Rok: {contract.startYear}-{contract.endYear}</li>
                                                <li>Stopie?? studi??w: {contract.degree}</li>
                                                <li>Ilo???? miejsc: {contract.vacancies} miejsca</li>
                                            </ul>
                                            </div>
                                            <div class="right">
                                                <form onSubmit={onFormSubmit(contract.id)}>
                                                    <label>
                                                        Zmie?? liczb?? miejsc:<br></br>
                                                        <input refs="vacancies" type="number" min="0"/>
                                                    </label>
                                                    <br></br>
                                                    <Button type="submit">Zatwierd??</Button>
                                                </form>
                                            </div>
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