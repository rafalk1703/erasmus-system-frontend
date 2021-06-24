import React, { Component } from 'react';
import ContractService from '../services/ContractService';
import { Accordion, Card } from "react-bootstrap";
import "./ContractList.css";


class ContractsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contracts: []
        }
    }

    componentDidMount() {
        ContractService.getAllContracts().then((response) => {
            this.setState({ contracts: response.data.body })
        });
    }
    render() {
        return (
            <div>
                <h1 className='text-center'>Lista Kontraktów</h1>
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
                                                <li>{contract.faculty}</li>
                                                <li>{contract.contractCoordinator.name}</li>
                                                <li>{contract.startYear}-{contract.endYear}</li>
                                                <li>{contract.degree}</li>
                                                <li>{contract.vacancies} miejsca</li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                        )
                    }
                </Accordion>
            </div>
        );
    }

}

export default ContractsList;