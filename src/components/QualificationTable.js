import React from "react";
import QualificationService from '../services/QualificationService';
import {Table} from "react-bootstrap";

class QualificationTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            contracts: []
        }
    }

    componentDidMount() {
        QualificationService.getContracts().then(response => {
            this.setState({contracts: response.data.body})
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h1 className='text-center'>Kwalifikacja Studentów</h1>
                {
                    this.state.contracts.map(
                        contract =>
                            <Table bordered hover>
                                <thead>
                                <tr>{contract.erasmusCode}</tr>
                                <tr>
                                    <td>{contract.contractsCoordinator.name}</td>
                                    <td>ilość miejsc: {contract.vacancies}</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    contract.registrations.map(
                                        registration =>
                                            <tr key={registration.id}>
                                                <td>{registration.isAccepted}</td>
                                                <td>{registration.priority}</td>
                                                <td>{registration.student.name} {registration.student.surname}</td>
                                                <td>{registration.student.department} {registration.student.field} {registration.student.year} rok</td>
                                            </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                    )
                }
            </div>
        );
    }
}

export default QualificationTable;