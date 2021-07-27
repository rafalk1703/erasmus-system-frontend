import React from "react";
import {Card, CardColumns, Row, Col, Button} from "react-bootstrap";
import QualificationService from '../services/QualificationService';
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
                <Row xs={1} md={3} className="g-4">
                    {
                        this.state.contracts.map(
                            contract =>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                <h4 className='text-center'> {contract.erasmusCode} </h4>
                                            </Card.Title>
                                            <Card.Subtitle>
                                                {contract.contractsCoordinator.name} ilość miejsc: {contract.vacancies}
                                            </Card.Subtitle>
                                            <CardColumns>
                                                {
                                                    contract.registrations.map(
                                                        registration =>
                                                            <Card key={registration.id}>
                                                                <div>
                                                                    <div>
                                                                        <Button variant="secondary">+</Button>
                                                                    </div>
                                                                    <div className='square'
                                                                         style={{
                                                                             backgroundColor: (registration.priority == '1') ? '#FFD700' :
                                                                                 (registration.priority == '2') ? '#C0C0C0' : '#A52A2A'
                                                                         }}>
                                                                        {registration.priority}
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <h5>{registration.student.name} {registration.student.surname}</h5>
                                                                        </div>
                                                                        <div>
                                                                            {registration.student.department}, {registration.student.field}, {registration.student.year} rok
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                    )
                                                }
                                            </CardColumns>
                                        </Card.Body>
                                    </Card>
                                </Col>
                        )
                    }
                </Row>
            </div>
        );
    }
}

export default QualificationTable;