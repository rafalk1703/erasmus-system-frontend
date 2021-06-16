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
                <h1 className = 'text-center'>Contracts List</h1>
            <Accordion>
                {
                    this.state.contracts.map(
                        contract =>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey={contract.id}>
                                {contract.erasmusCode}
    </Accordion.Toggle>
                                <Accordion.Collapse eventKey={contract.id}>
                                    <Card.Body>{contract.degree}</Card.Body>
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