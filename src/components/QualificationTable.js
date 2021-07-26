import React from "react";
import QualificationService from '../services/QualificationService';
import {Table} from "react-bootstrap";
import "./QualificationTable.css";

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
                            <table>
                                <thead>
                                    <tr>
                                        <div>
                                            <h4 className='text-center'> {contract.erasmusCode} </h4>
                                        </div>
                                        <div>
                                            {contract.contractsCoordinator.name} ilość miejsc: {contract.vacancies}
                                        </div>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contract.registrations.map(
                                            registration =>
                                                <tr key={registration.id}>
                                                    {registration.isAccepted}
                                                    <div className='square'>
                                                        {registration.priority}
                                                    </div>
                                                    <div>
                                                        <h5>{registration.student.name} {registration.student.surname}</h5>
                                                    </div>
                                                    <div>
                                                        {registration.student.department}, {registration.student.field}, {registration.student.year} rok
                                                    </div>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                    )
                }
            </div>
        );
    }
}

export default QualificationTable;